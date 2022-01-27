import 'package:flutter/material.dart';

class Frame extends StatelessWidget {
  final bool showLogo;
  final Widget? button;
  final Widget? child;
  final String text;
  final String topText;

  const Frame(
      {Key? key,
      this.text = "",
      this.showLogo = false,
      this.button,
      this.child,
      this.topText = ""})
      : super(key: key);

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
                  Column(children: [
                    Text(
                      topText,
                      style: const TextStyle(
                          fontSize: 36, fontWeight: FontWeight.bold),
                    ),
                    Text(
                      text,
                      style: const TextStyle(
                          fontSize: 36, fontWeight: FontWeight.bold),
                    ),
                    if (showLogo)
                      const FlutterLogo(
                        size: 100,
                      )
                  ])
                ])),
            Expanded(
                child: Container(
              child: child,
            )),
            if (button != null)
              Container(
                  margin: const EdgeInsets.fromLTRB(0, 0, 0, 70),
                  child: Row(
                      mainAxisAlignment: MainAxisAlignment.center,
                      children: [
                        button!
                        /*ElevatedButton(
                          onPressed: () {},
                          child: const Text("START",
                              style: TextStyle(
                                  color: Colors.black,
                                  fontWeight: FontWeight.bold)),
                          style: ElevatedButton.styleFrom(
                            primary: Colors.white,
                            minimumSize: const Size(240, 50),
                            maximumSize: const Size(240, 50),
                          ),
                        )*/
                      ]))
          ],
        ));
  }
}
