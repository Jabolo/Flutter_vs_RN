import 'dart:convert';
import 'dart:io';

import 'package:device_info_plus/device_info_plus.dart';
import 'package:flutter/material.dart';
import 'package:http/http.dart' as http;
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
  String? deviceId;

  Future<String> getDeviceInfo() async {
    final deviceInfo = DeviceInfoPlugin();

    if (Platform.isAndroid) {
      AndroidDeviceInfo androidInfo = await deviceInfo.androidInfo;
      return androidInfo.board!;
    }
    return "Ni ma :(";
  }

  Future<void> sendToDB(String device, List<dynamic> results) async {
    try {
      // POST: https://db-proxy.azurewebsites.net/api/flutter
      // body:
      // {
      //   "device": "my_device",
      //   "results": "[result1, resul2, result3, etc]"
      // }
      final body = jsonEncode({
        'device': device,
        'results': jsonEncode(results),
      });
      final response = await http.post(
        Uri.parse('https://db-proxy.azurewebsites.net/api/flutter'),
        body: body,
      );
      if(response.statusCode != 200)
      {
        print("Error from proxy: ${response.statusCode} ${response.body}");
      }
    } catch (e) {
      print("Cannot connect to db :(");
    }
  }

  Future<void> loadData() async {
    final _deviceId = await getDeviceInfo();

    setState(() {
      deviceId = _deviceId;
    });

    await sendToDB(deviceId!, widget.results);
  }

  @override
  void initState() {
    super.initState();
    loadData();
  }

  @override
  Widget build(BuildContext context) {
    return Frame(
      text: "Result",
      showLogo: true,
      button: NiceButton(
        text: "START AGAIN",
        onPressed: () {
          BenchmarkManager.nextBenchmark(context);
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
                      return ListTile(
                          leading: Text("Device ID"),
                          trailing: Text(deviceId ?? "?"));
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
