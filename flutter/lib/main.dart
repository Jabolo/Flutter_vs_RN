import 'package:flutter/material.dart';
import 'widgets/frame.dart';
import 'widgets/nicebutton.dart';

import 'bench1.dart';
import 'bench2.dart';
import 'bench3.dart';
import 'benchmark_manager.dart';
import 'result.dart';

final GlobalKey<NavigatorState> navigatorKey = GlobalKey<NavigatorState>();

void main() {
  runApp(const MyApp());
}

class MyApp extends StatelessWidget {
  const MyApp({Key? key}) : super(key: key);

  @override
  Widget build(BuildContext context) {
    return BenchmarkManager(
        benchmarks: [Bench1(), Bench2(), Bench3()],
        onFinished: (result) {
          navigatorKey.currentState?.pushAndRemoveUntil(
              MaterialPageRoute(builder: (BuildContext c) {
            return Result(
              results: result,
            );
          }), (route) => false);
        },
        child: MaterialApp(
          navigatorKey: navigatorKey,
          title: 'Flutter Benchmark',
          theme: ThemeData(
            primarySwatch: Colors.blue,
          ),
          home: const MainScreen(),
        ));
  }
}

class MainScreen extends StatefulWidget {
  const MainScreen({Key? key}) : super(key: key);

  @override
  State<MainScreen> createState() => _MainScreenState();
}

class _MainScreenState extends State<MainScreen> {
  @override
  Widget build(BuildContext context) {
    return Frame(
        text: "BechmarkApp",
        showLogo: true,
        button: NiceButton(
          text: "START",
          onPressed: () {
            BenchmarkManager.nextBenchmark(context);
          },
        ));
  }
}
