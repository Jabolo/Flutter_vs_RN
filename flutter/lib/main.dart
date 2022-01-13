import 'package:flutter/material.dart';

void main() {
  runApp(const MyApp());
}

class MyApp extends StatelessWidget {
  const MyApp({Key? key}) : super(key: key);

  @override
  Widget build(BuildContext context) {
    return MaterialApp(
      title: 'Flutter Benchmark',
      theme: ThemeData(
        primarySwatch: Colors.blue,
      ),
      home: const MainScreen(),
    );
  }
}

class MainScreen extends StatefulWidget {
  const MainScreen({Key? key}) : super(key: key);

  @override
  State<MainScreen> createState() => _MainScreenState();
}

class _MainScreenState extends State<MainScreen> {
  @override
  Widget build(BuildContext context) {
    return Scaffold(
        backgroundColor: Colors.white,
        body: Column(
          children: [
            Container(
                margin: const EdgeInsets.fromLTRB(0, 70, 0, 0),
                child:
                    Row(mainAxisAlignment: MainAxisAlignment.center, children: [
                  Column(children: const [
                    Text(
                      "BechmarkApp",
                      style:
                          TextStyle(fontSize: 36, fontWeight: FontWeight.bold),
                    ),
                    FlutterLogo(
                      size: 100,
                    )
                  ])
                ])),
            Expanded(child: Container()),
            Container(
                margin: const EdgeInsets.fromLTRB(0, 0, 0, 70),
                child:
                    Row(mainAxisAlignment: MainAxisAlignment.center, children: [
                  ElevatedButton(
                    onPressed: () {},
                    child: const Text("START",
                        style: TextStyle(
                            color: Colors.black, fontWeight: FontWeight.bold)),
                    style: ElevatedButton.styleFrom(
                      primary: Colors.white,
                      minimumSize: const Size(240, 50),
                      maximumSize: const Size(240, 50),
                    ),
                  )
                ]))
          ],
        ));
  }
}
