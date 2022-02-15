import 'package:flutter/material.dart';
import 'widgets/frame.dart';

import 'benchmark_manager.dart';
import 'package:performance_fps/performance_fps.dart';

class Bench2 extends StatefulWidget {
  const Bench2({Key? key}) : super(key: key);

  @override
  State<Bench2> createState() => _Bench2State();
}

class _Bench2State extends State<Bench2> {
  final ScrollController _controller = ScrollController();

  @override
  void initState() {
    super.initState();

    Future.delayed(Duration.zero, () {
      _controller.animateTo(_controller.position.maxScrollExtent,
          duration: const Duration(seconds: 10), curve: Curves.fastOutSlowIn);

      BenchmarkManager.measureFPS(5, (fps) {
        BenchmarkManager.setResult(context, fps);
        BenchmarkManager.nextBenchmark(context);
      });
    });
  }

  @override
  Widget build(BuildContext context) {
    final i = BenchmarkManager.of(context).benchmarkIndex;
    final len = BenchmarkManager.of(context).benchmarksLength;

    return Frame(
      text: "List",
      topText: "${i + 1}/$len",
      child: ListView.builder(
        controller: _controller,
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
