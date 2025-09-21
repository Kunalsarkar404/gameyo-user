import 'package:flutter/material.dart';

enum AppState {
  splash,
  login,
  signup,
  app,
}

enum AppTab {
  home,
  matches,
  tournaments,
  friends,
  profile,
}

class AppStateProvider extends ChangeNotifier {
  AppState _currentState = AppState.splash;
  AppTab _activeTab = AppTab.home;
  String _matchFilter = 'all';

  AppState get currentState => _currentState;
  AppTab get activeTab => _activeTab;
  String get matchFilter => _matchFilter;

  void setCurrentState(AppState state) {
    _currentState = state;
    notifyListeners();
  }

  void setActiveTab(AppTab tab) {
    if (_activeTab == AppTab.matches && tab != AppTab.matches) {
      _matchFilter = 'all';
    }
    _activeTab = tab;
    notifyListeners();
  }

  void setMatchFilter(String filter) {
    _matchFilter = filter;
    notifyListeners();
  }

  void handleQuickMatch() {
    _matchFilter = 'online';
    _activeTab = AppTab.matches;
    notifyListeners();
  }
}