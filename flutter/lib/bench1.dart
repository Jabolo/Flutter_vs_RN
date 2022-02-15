import 'package:flutter/material.dart';
import 'widgets/frame.dart';
import 'benchmark_manager.dart';

// LZW-compress a string
String lzwEncode(String s) {
  var dict = {};
  var data = (s + "").split("");
  var out = [];
  String currChar;
  var phrase = data[0];
  var code = 256;
  for (var i = 1; i < data.length; i++) {
    currChar = data[i];
    if (dict[phrase + currChar] != null) {
      phrase += currChar;
    } else {
      out.add(phrase.length > 1 ? dict[phrase] : phrase.codeUnits[0]);
      dict[phrase + currChar] = code;
      code++;
      phrase = currChar;
    }
  }
  out.add(phrase.length > 1 ? dict[phrase] : phrase.codeUnits[0]);
  for (var i = 0; i < out.length; i++) {
    out[i] = String.fromCharCode(out[i]);
  }
  return out.join("");
}

class Bench1 extends StatefulWidget {
  const Bench1({Key? key}) : super(key: key);

  @override
  State<Bench1> createState() => _Bench1State();
}

class _Bench1State extends State<Bench1> {
  @override
  void initState() {
    super.initState();

    Future.delayed(const Duration(milliseconds: 1000), () {
      final result = BenchmarkManager.measureMicroTime(() {
        for (int i = 0; i < 10000; i++) {
          final _output = lzwEncode("looong randooom ttteeeexxxttt");
        }
      });

      BenchmarkManager.setResult(context, result);
      BenchmarkManager.nextBenchmark(context);
    });
  }

  @override
  Widget build(BuildContext context) {
    final i = BenchmarkManager.of(context).benchmarkIndex;
    final len = BenchmarkManager.of(context).benchmarksLength;

    return Frame(
      text: "Calculation",
      topText: "${i + 1}/$len",
    );
  }
}
