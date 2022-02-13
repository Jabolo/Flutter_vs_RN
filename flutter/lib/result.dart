import 'dart:io';

import 'package:device_info_plus/device_info_plus.dart';
import 'package:flutter/material.dart';
import 'widgets/frame.dart';
import 'widgets/nicebutton.dart';

import 'benchmark_manager.dart';

class Result extends StatefulWidget {
  Result({Key? key, required this.results}) : super(key: key);
  List<dynamic> results;

  @override
  State<Result> createState() => _ResultState();
}

class _ResultState extends State<Result> {
  Future<String> getDeviceInfo() async {
    final deviceInfo = DeviceInfoPlugin();

    if (Platform.isAndroid) {
      AndroidDeviceInfo androidInfo = await deviceInfo.androidInfo;
      return androidInfo.board!;
    }
    return "Ni ma :(";
  }

  @override
  Widget build(BuildContext context) {
    return Frame(
      text: "Result",
      showLogo: true,
      button: NiceButton(
        text: "START AGAIN",
        onPressed: () {
          BenchmarkManager.of(context).nextBenchmark(context);
        },
      ),
      child: Card(
          margin: const EdgeInsets.symmetric(vertical: 20, horizontal: 60),
          child: Container(
              padding: EdgeInsets.symmetric(horizontal: 20),
              child: ListView.builder(
                  itemCount: widget.results.length + 1,
                  itemBuilder: (context, index) {
                    if (index == 0) {
                      return const ListTile(
                          leading: Text("Device ID"),
                          trailing: Text("Nie wiem, ale sie dowiem"));
                    }

                    return ListTile(
                      leading: Text("Bench$index"),
                      trailing: Text(widget.results[index - 1]
                          .toString()), // TODO: zrobic ladna zielona ikonke jak na figma
                    );
                  }))),
    );
  }
}
