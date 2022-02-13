import 'package:flutter/material.dart';

class BenchmarkManager extends StatefulWidget {
  BenchmarkManager(
      {Key? key,
      required this.child,
      required this.benchmarks,
      required this.onFinished})
      : super(key: key);
  Widget? child;
  List<Widget> benchmarks;
  Function(List<dynamic>) onFinished;

  @override
  BenchmarkManagerState createState() => BenchmarkManagerState();

  static BenchmarkManagerState of(BuildContext context) {
    return context.findAncestorStateOfType<BenchmarkManagerState>()!;
  }
}

class BenchmarkManagerState extends State<BenchmarkManager> {
  int _benchmarkIndex = -1;

  int get benchmarkIndex => _benchmarkIndex;
  int get benchmarksLength => widget.benchmarks.length;

  List<dynamic> results = [];

  void setResult(dynamic data) {
    results.add(data);
  }

  void nextBenchmark(BuildContext myContext) {
    _benchmarkIndex++;
    print(_benchmarkIndex);

    if (benchmarkIndex >= widget.benchmarks.length) {
      widget.onFinished(results);
      _benchmarkIndex = -1;
      results = [];
      return;
    }
    Navigator.of(myContext).pushAndRemoveUntil(
        MaterialPageRoute(builder: (BuildContext c) {
      return widget.benchmarks[benchmarkIndex];
    }), (route) => false);
  }

  @override
  Widget build(BuildContext context) {
    return widget.child!;
  }
}
