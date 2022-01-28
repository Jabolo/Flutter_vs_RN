import 'package:flutter/material.dart';
import 'widgets/frame.dart';

import 'bench3.dart';

class Bench2 extends StatefulWidget {
  const Bench2({Key? key}) : super(key: key);

  @override
  State<Bench2> createState() => _Bench2State();
}

class _Bench2State extends State<Bench2> {
  @override
  void initState() {
    super.initState();

    Future.delayed(const Duration(milliseconds: 1000), () {
      Navigator.pushReplacement(context,
          MaterialPageRoute(builder: (BuildContext c) {
        return Bench3();
      }));
    });
  }

  @override
  Widget build(BuildContext context) {
    return Frame(
      text: "List",
      topText: "2/2",
      child: ListView.builder(
        itemCount: 1000,
        itemBuilder: (context, index) {
          return ListTile(
            title: SizedBox(
                height: 60,
                width: 200,
                child: Card(
                    margin: const EdgeInsets.symmetric(horizontal: 60),
                    child: Column(
                        mainAxisAlignment: MainAxisAlignment.center,
                        children: [Text(index.toString())]))),
          );
        },
      ),
    );
  }
}
