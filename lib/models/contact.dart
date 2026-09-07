class Contact {
  final String id;
  final String name;
  final String phone;
  final String imagePath;

  Contact({
    required this.id,
    required this.name,
    required this.phone,
    required this.imagePath,
  });

  factory Contact.fromParse(Map<String, dynamic> map) {
    return Contact(
      id: map['objectId'] as String,
      name: map['name'] as String? ?? '',
      phone: map['phone'] as String? ?? '',
      imagePath: map['imagePath'] as String? ?? '',
    );
  }
}
