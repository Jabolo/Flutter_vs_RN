import 'package:flutter/material.dart';
import 'widgets/frame.dart';

import 'benchmark_manager.dart';

class Bench3 extends StatefulWidget {
  const Bench3({Key? key}) : super(key: key);

  @override
  State<Bench3> createState() => _Bench3State();
}

class _Bench3State extends State<Bench3> {
  @override
  void initState() {
    super.initState();

    Future.delayed(const Duration(milliseconds: 1000), () {
      BenchmarkManager.of(context).nextBenchmark(context);
    });
  }

  @override
  Widget build(BuildContext context) {
    final i = BenchmarkManager.of(context).benchmarkIndex;
    final len = BenchmarkManager.of(context).benchmarksLength;

    return Frame(
        text: "Anim",
        topText: "${i + 1}/$len",
        child: Container(
            color: Colors.white,
            child: Column(
              mainAxisSize: MainAxisSize.max,
              mainAxisAlignment: MainAxisAlignment.center,
              children: [
                for (int i = 0; i < 4; i++)
                  Expanded(
                      child: Row(children: [
                    for (int j = 0; j < 4; j++)
                      Expanded(
                          child: AspectRatio(
                              aspectRatio: 1.0,
                              child: Container(
                                decoration: const BoxDecoration(
                                    gradient: LinearGradient(
                                      begin: Alignment.centerLeft,
                                      end: Alignment.centerRight,
                                      colors: [
                                        Color(0xFFD500F9),
                                        Color(0xFFFF1744),
                                      ],
                                    ),
                                    borderRadius:
                                        BorderRadius.all(Radius.circular(20))),
                                margin: const EdgeInsets.all(10),
                              )))
                  ]))
              ],
            )));
  }
}
