import 'dart:io';
import 'package:parse_server_sdk_flutter/parse_server_sdk.dart';

class ParseService {
  static const String className = 'Contact';

  // Save contact with image path only
  static Future<ParseObject> createContact({
    required String name,
    required String phone,
    required String imagePath,
  }) async {
    final contact = ParseObject(className)
      ..set('name', name)
      ..set('phone', phone)
      ..set('imagePath', imagePath);

    final response = await contact.save();
    if (response.success && response.result != null) {
      return response.result as ParseObject;
    } else {
      throw Exception('Failed to save contact: ${response.error?.message}');
    }
  }

  // Fetch all contacts
  static Future<List<ParseObject>> fetchContacts() async {
    final query = QueryBuilder<ParseObject>(ParseObject(className))
      ..orderByAscending('name');
    final response = await query.query();
    if (response.success && response.results != null) {
      return response.results as List<ParseObject>;
    } else {
      return <ParseObject>[];
    }
  }

  // Optional: delete contact
  static Future<bool> deleteContact(String objectId) async {
    final parseObject = ParseObject(className)..objectId = objectId;
    final response = await parseObject.delete();
    return response.success;
  }
}
