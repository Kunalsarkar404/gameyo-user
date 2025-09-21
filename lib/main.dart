import 'package:flutter/material.dart';
import 'package:flutter/services.dart';
import 'package:provider/provider.dart';
import 'package:google_fonts/google_fonts.dart';
import 'providers/theme_provider.dart';
import 'providers/app_state_provider.dart';
import 'screens/splash_screen.dart';
import 'screens/auth/login_screen.dart';
import 'screens/auth/signup_screen.dart';
import 'screens/main_app_screen.dart';
import 'theme/app_theme.dart';

void main() {
  WidgetsFlutterBinding.ensureInitialized();
  
  // Set system UI overlay style
  SystemChrome.setSystemUIOverlayStyle(
    const SystemUiOverlayStyle(
      statusBarColor: Colors.transparent,
      statusBarIconBrightness: Brightness.light,
      systemNavigationBarColor: Colors.transparent,
    ),
  );
  
  runApp(const GameyoApp());
}

class GameyoApp extends StatelessWidget {
  const GameyoApp({super.key});

  @override
  Widget build(BuildContext context) {
    return MultiProvider(
      providers: [
        ChangeNotifierProvider(create: (_) => ThemeProvider()),
        ChangeNotifierProvider(create: (_) => AppStateProvider()),
      ],
      child: Consumer<ThemeProvider>(
        builder: (context, themeProvider, child) {
          return MaterialApp(
            title: 'Gameyo',
            debugShowCheckedModeBanner: false,
            theme: AppTheme.lightTheme,
            darkTheme: AppTheme.darkTheme,
            themeMode: themeProvider.themeMode,
            home: const AppNavigator(),
          );
        },
      ),
    );
  }
}

class AppNavigator extends StatelessWidget {
  const AppNavigator({super.key});

  @override
  Widget build(BuildContext context) {
    return Consumer<AppStateProvider>(
      builder: (context, appState, child) {
        switch (appState.currentState) {
          case AppState.splash:
            return SplashScreen(
              onComplete: () => appState.setCurrentState(AppState.login),
            );
          case AppState.login:
            return LoginScreen(
              onLogin: () => appState.setCurrentState(AppState.app),
              onSignup: () => appState.setCurrentState(AppState.signup),
            );
          case AppState.signup:
            return SignupScreen(
              onSignup: () => appState.setCurrentState(AppState.app),
              onLogin: () => appState.setCurrentState(AppState.login),
            );
          case AppState.app:
            return const MainAppScreen();
          default:
            return const SplashScreen();
        }
      },
    );
  }
}