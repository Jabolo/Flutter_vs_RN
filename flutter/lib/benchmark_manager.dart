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

  static void setResult(BuildContext context, dynamic data) {
    BenchmarkManager.of(context).setResult(data);
  }

  static void nextBenchmark(BuildContext context) {
    BenchmarkManager.of(context).nextBenchmark(context);
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
