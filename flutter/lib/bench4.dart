import 'dart:io';
import 'dart:math';

import 'package:flutter/material.dart';
import 'package:path_provider/path_provider.dart';
import 'widgets/frame.dart';
import 'benchmark_manager.dart';

class Bench4 extends StatefulWidget {
  const Bench4({Key? key}) : super(key: key);

  @override
  State<Bench4> createState() => _Bench4State();
}

class _Bench4State extends State<Bench4> {
  static const sizes = [
    1024 * 1,
    1024 * 8,
    1024 * 64,
    1024 * 512,
    1024 * 4096,
    1024 * 32768
  ];

  static const counts = [60, 50, 40, 20, 10, 1];

  Future<int> readTime(int size, int count) async {
    Directory dir = await getApplicationDocumentsDirectory();
    final rng = Random(123);
    final bytes = List.generate(size, (_) => rng.nextInt(200));
    final filePath = '${dir.path}/file_$size.bin';
    await File(filePath).writeAsBytes(bytes, flush: true);

    int total = 0;
    for (int i = 0; i < count; i++) {
      total += BenchmarkManager.measureMicroTime(() {
        final result = File(filePath).readAsBytesSync();
        final rng2 = Random(123);
        if (result[0] != rng2.nextInt(200)) {
          // error :/
          print("error while reading file");
        }
      });
    }

    await File(filePath).delete();
    return total;
  }

  @override
  void initState() {
    super.initState();

    Future.delayed(const Duration(milliseconds: 1000), () async {
      final results = <int>[];
      int i = 0;
      for (final size in sizes) {
        results.add(await readTime(size, counts[i]));
        i++;
      }

      BenchmarkManager.setResult(context, results);
      BenchmarkManager.nextBenchmark(context);
    });
  }

  @override
  Widget build(BuildContext context) {
    final i = BenchmarkManager.of(context).benchmarkIndex;
    final len = BenchmarkManager.of(context).benchmarksLength;

    return Frame(
      text: "Disk IO",
      topText: "${i + 1}/$len",
    );
  }
}
