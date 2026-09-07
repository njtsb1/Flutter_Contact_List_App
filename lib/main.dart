import 'package:flutter/material.dart';
import 'package:parse_server_sdk_flutter/parse_server_sdk.dart';
import 'pages/contact_list_page.dart';

void main() async {
  WidgetsFlutterBinding.ensureInitialized();

  // Replace these with your Back4App credentials
  const String appId = 'YOUR_APP_ID';
  const String clientKey = 'YOUR_CLIENT_KEY';
  const String serverUrl = 'https://parseapi.back4app.com';

  await Parse().initialize(
    appId,
    serverUrl,
    clientKey: clientKey,
    debug: true,
  );

  runApp(const MyApp());
}

class MyApp extends StatelessWidget {
  const MyApp({super.key});

  @override
  Widget build(BuildContext context) {
    return MaterialApp(
      title: 'Contact List App',
      theme: ThemeData(
        primarySwatch: Colors.indigo,
      ),
      home: const ContactListPage(),
    );
  }
}
