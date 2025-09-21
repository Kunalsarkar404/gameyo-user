import 'package:flutter/material.dart';
import 'package:provider/provider.dart';
import '../providers/app_state_provider.dart';
import '../widgets/bottom_navigation.dart';
import 'home/home_screen.dart';
import 'matches/match_screen.dart';
import 'tournaments/tournament_screen.dart';
import 'friends/friends_screen.dart';
import 'profile/profile_screen.dart';

class MainAppScreen extends StatelessWidget {
  const MainAppScreen({super.key});

  @override
  Widget build(BuildContext context) {
    return Consumer<AppStateProvider>(
      builder: (context, appState, child) {
        return Scaffold(
          body: _buildCurrentScreen(appState.activeTab),
          bottomNavigationBar: const BottomNavigation(),
        );
      },
    );
  }

  Widget _buildCurrentScreen(AppTab activeTab) {
    switch (activeTab) {
      case AppTab.home:
        return const HomeScreen();
      case AppTab.matches:
        return const MatchScreen();
      case AppTab.tournaments:
        return const TournamentScreen();
      case AppTab.friends:
        return const FriendsScreen();
      case AppTab.profile:
        return const ProfileScreen();
      default:
        return const HomeScreen();
    }
  }
}