import 'package:flutter/material.dart';
import 'package:provider/provider.dart';
import '../providers/app_state_provider.dart';

class BottomNavigation extends StatelessWidget {
  const BottomNavigation({super.key});

  @override
  Widget build(BuildContext context) {
    final theme = Theme.of(context);
    
    return Consumer<AppStateProvider>(
      builder: (context, appState, child) {
        return Container(
          decoration: BoxDecoration(
            color: theme.colorScheme.surface.withOpacity(0.95),
            border: Border(
              top: BorderSide(
                color: theme.colorScheme.onSurface.withOpacity(0.1),
                width: 1,
              ),
            ),
          ),
          child: SafeArea(
            child: Padding(
              padding: const EdgeInsets.symmetric(horizontal: 16, vertical: 8),
              child: Row(
                mainAxisAlignment: MainAxisAlignment.spaceAround,
                children: [
                  _buildNavItem(
                    context,
                    Icons.home_outlined,
                    Icons.home,
                    AppTab.home,
                    appState.activeTab == AppTab.home,
                    () => appState.setActiveTab(AppTab.home),
                  ),
                  _buildNavItem(
                    context,
                    Icons.sports_esports_outlined,
                    Icons.sports_esports,
                    AppTab.matches,
                    appState.activeTab == AppTab.matches,
                    () => appState.setActiveTab(AppTab.matches),
                  ),
                  _buildNavItem(
                    context,
                    Icons.emoji_events_outlined,
                    Icons.emoji_events,
                    AppTab.tournaments,
                    appState.activeTab == AppTab.tournaments,
                    () => appState.setActiveTab(AppTab.tournaments),
                    isSpecial: true,
                  ),
                  _buildNavItem(
                    context,
                    Icons.people_outline,
                    Icons.people,
                    AppTab.friends,
                    appState.activeTab == AppTab.friends,
                    () => appState.setActiveTab(AppTab.friends),
                  ),
                  _buildNavItem(
                    context,
                    Icons.person_outline,
                    Icons.person,
                    AppTab.profile,
                    appState.activeTab == AppTab.profile,
                    () => appState.setActiveTab(AppTab.profile),
                  ),
                ],
              ),
            ),
          ),
        );
      },
    );
  }

  Widget _buildNavItem(
    BuildContext context,
    IconData outlinedIcon,
    IconData filledIcon,
    AppTab tab,
    bool isActive,
    VoidCallback onTap, {
    bool isSpecial = false,
  }) {
    final theme = Theme.of(context);
    
    return GestureDetector(
      onTap: onTap,
      child: AnimatedContainer(
        duration: const Duration(milliseconds: 200),
        padding: const EdgeInsets.all(12),
        decoration: BoxDecoration(
          color: isActive && isSpecial
              ? theme.colorScheme.primary.withOpacity(0.1)
              : Colors.transparent,
          borderRadius: BorderRadius.circular(16),
        ),
        child: AnimatedScale(
          scale: isActive ? (isSpecial ? 1.25 : 1.1) : 1.0,
          duration: const Duration(milliseconds: 200),
          child: Stack(
            children: [
              Icon(
                isActive ? filledIcon : outlinedIcon,
                size: isSpecial ? 26 : 22,
                color: isActive
                    ? theme.colorScheme.primary
                    : theme.colorScheme.onSurface.withOpacity(0.6),
              ),
              if (isActive)
                Positioned.fill(
                  child: Container(
                    decoration: BoxDecoration(
                      borderRadius: BorderRadius.circular(8),
                      boxShadow: [
                        BoxShadow(
                          color: theme.colorScheme.primary.withOpacity(0.3),
                          blurRadius: 8,
                          spreadRadius: 2,
                        ),
                      ],
                    ),
                  ),
                ),
            ],
          ),
        ),
      ),
    );
  }
}