import 'package:flutter/material.dart';

class NiceButton extends StatelessWidget {
  final String text;
  final VoidCallback? onPressed;

  const NiceButton(
      {Key? key,
      this.text = "",
      required this.onPressed,
  })
      : super(key: key);

  @override
  Widget build(BuildContext context) {
    return ElevatedButton(
        onPressed: onPressed,
        child: Text(text,
            style: const TextStyle(color: Colors.black, fontWeight: FontWeight.bold)),
        style: ElevatedButton.styleFrom(
          primary: Colors.white,
          minimumSize: const Size(240, 50),
          maximumSize: const Size(240, 50),
        ),
      );
  }
}
