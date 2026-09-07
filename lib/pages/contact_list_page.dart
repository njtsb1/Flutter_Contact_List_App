import 'dart:io';
import 'package:flutter/material.dart';
import 'package:parse_server_sdk_flutter/parse_server_sdk.dart';
import '../models/contact.dart';
import '../services/parse_service.dart';
import 'add_contact_page.dart';

class ContactListPage extends StatefulWidget {
  const ContactListPage({super.key});

  @override
  State<ContactListPage> createState() => _ContactListPageState();
}

class _ContactListPageState extends State<ContactListPage> {
  List<Contact> _contacts = [];
  bool _loading = true;

  @override
  void initState() {
    super.initState();
    _loadContacts();
  }

  Future<void> _loadContacts() async {
    setState(() => _loading = true);
    final results = await ParseService.fetchContacts();
    final list = results.map((p) {
      final map = <String, dynamic>{
        'objectId': p.objectId,
        'name': p.get<String>('name') ?? '',
        'phone': p.get<String>('phone') ?? '',
        'imagePath': p.get<String>('imagePath') ?? '',
      };
      return Contact.fromParse(map);
    }).toList();

    setState(() {
      _contacts = list;
      _loading = false;
    });
  }

  Future<void> _deleteContact(String id) async {
    final ok = await ParseService.deleteContact(id);
    if (ok) {
      await _loadContacts();
    } else {
      ScaffoldMessenger.of(context).showSnackBar(const SnackBar(content: Text('Failed to delete contact')));
    }
  }

  Widget _buildTile(Contact c) {
    final imageFile = c.imagePath.isNotEmpty ? File(c.imagePath) : null;
    final imageExists = imageFile != null && imageFile.existsSync();

    return ListTile(
      leading: CircleAvatar(
        radius: 26,
        backgroundColor: Colors.grey[300],
        backgroundImage: imageExists ? FileImage(imageFile!) : null,
        child: !imageExists ? const Icon(Icons.person, color: Colors.white) : null,
      ),
      title: Text(c.name),
      subtitle: Text(c.phone),
      trailing: IconButton(
        icon: const Icon(Icons.delete, color: Colors.redAccent),
        onPressed: () => _confirmDelete(c.id),
      ),
    );
  }

  void _confirmDelete(String id) {
    showDialog(
      context: context,
      builder: (ctx) => AlertDialog(
        title: const Text('Delete contact'),
        content: const Text('Are you sure you want to delete this contact?'),
        actions: [
          TextButton(onPressed: () => Navigator.of(ctx).pop(), child: const Text('Cancel')),
          TextButton(
            onPressed: () {
              Navigator.of(ctx).pop();
              _deleteContact(id);
            },
            child: const Text('Delete', style: TextStyle(color: Colors.red)),
          ),
        ],
      ),
    );
  }

  Future<void> _openAddContact() async {
    final result = await Navigator.of(context).push(MaterialPageRoute(builder: (_) => const AddContactPage()));
    if (result == true) {
      await _loadContacts();
    }
  }

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(
        title: const Text('Contacts'),
        actions: [
          IconButton(onPressed: _loadContacts, icon: const Icon(Icons.refresh)),
        ],
      ),
      body: _loading
          ? const Center(child: CircularProgressIndicator())
          : _contacts.isEmpty
              ? const Center(child: Text('No contacts yet. Tap + to add one.'))
              : ListView.separated(
                  itemCount: _contacts.length,
                  separatorBuilder: (_, __) => const Divider(height: 1),
                  itemBuilder: (_, i) => _buildTile(_contacts[i]),
                ),
      floatingActionButton: FloatingActionButton(
        onPressed: _openAddContact,
        child: const Icon(Icons.add),
      ),
    );
  }
}
