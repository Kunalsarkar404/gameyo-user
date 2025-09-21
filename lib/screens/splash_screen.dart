import 'package:flutter/material.dart';
import 'package:flutter_animate/flutter_animate.dart';

class SplashScreen extends StatefulWidget {
  final VoidCallback? onComplete;

  const SplashScreen({super.key, this.onComplete});

  @override
  State<SplashScreen> createState() => _SplashScreenState();
}

class _SplashScreenState extends State<SplashScreen> {
  @override
  void initState() {
    super.initState();
    _startTimer();
  }

  void _startTimer() {
    Future.delayed(const Duration(seconds: 3), () {
      if (mounted && widget.onComplete != null) {
        widget.onComplete!();
      }
    });
  }

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      body: Container(
        decoration: const BoxDecoration(
          gradient: LinearGradient(
            begin: Alignment.topLeft,
            end: Alignment.bottomRight,
            colors: [
              Color(0xFF00FFFF), // Cyan
              Color(0xFF8A2BE2), // Blue Violet
              Color(0xFFFF00FF), // Magenta
            ],
          ),
        ),
        child: Center(
          child: Column(
            mainAxisAlignment: MainAxisAlignment.center,
            children: [
              // Main Logo Text
              Text(
                'GAMEYO',
                style: TextStyle(
                  fontSize: 64,
                  fontWeight: FontWeight.bold,
                  color: Colors.white,
                  letterSpacing: 4,
                ),
              )
                  .animate()
                  .fadeIn(duration: 1000.ms)
                  .scale(begin: const Offset(0.5, 0.5))
                  .then()
                  .shimmer(duration: 2000.ms),

              const SizedBox(height: 16),

              // Tagline
              Text(
                'Elevate Your Game',
                style: TextStyle(
                  fontSize: 24,
                  color: Colors.white.withOpacity(0.9),
                  fontWeight: FontWeight.w300,
                  letterSpacing: 2,
                ),
              )
                  .animate(delay: 500.ms)
                  .fadeIn(duration: 1000.ms)
                  .slideY(begin: 0.3),

              const SizedBox(height: 64),

              // Loading Dots
              Row(
                mainAxisAlignment: MainAxisAlignment.center,
                children: List.generate(3, (index) {
                  return Container(
                    margin: const EdgeInsets.symmetric(horizontal: 4),
                    width: 16,
                    height: 16,
                    decoration: const BoxDecoration(
                      color: Colors.white,
                      shape: BoxShape.circle,
                    ),
                  )
                      .animate(delay: (index * 300).ms)
                      .fadeIn(duration: 500.ms)
                      .then()
                      .scale(
                        begin: const Offset(1.0, 1.0),
                        end: const Offset(1.5, 1.5),
                        duration: 600.ms,
                      )
                      .then()
                      .scale(
                        begin: const Offset(1.5, 1.5),
                        end: const Offset(1.0, 1.0),
                        duration: 600.ms,
                      );
                }),
              ),
            ],
          ),
        ),
      ),
    );
  }
}