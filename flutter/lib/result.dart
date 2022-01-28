import 'package:flutter/material.dart';
import 'widgets/frame.dart';
import 'widgets/nicebutton.dart';

import 'bench1.dart';

class Result extends StatefulWidget {
  const Result({Key? key}) : super(key: key);

  @override
  State<Result> createState() => _ResultState();
}

class _ResultState extends State<Result> {
  @override
  Widget build(BuildContext context) {
    return Frame(
      text: "Result",
      showLogo: true,
      button: NiceButton(
        text: "START AGAIN",
        onPressed: () {
          Navigator.of(context).pushAndRemoveUntil(
              MaterialPageRoute(builder: (BuildContext c) {
            return Bench1();
          }), (route) => false);
        },
      ),
      child: Card(
          margin: const EdgeInsets.symmetric(vertical: 20, horizontal: 60),
          child: Container(
              padding: EdgeInsets.symmetric(horizontal: 20),
              child: ListView.builder(
                  itemCount: 3,
                  itemBuilder: (context, index) {
                    return ListTile(
                      leading: Text("Bench$index"),
                      trailing: Text("Pass"),
                    );
                  }))),
    );
  }
}
