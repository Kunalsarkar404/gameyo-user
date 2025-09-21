import 'package:flutter/material.dart';
import 'package:flutter_animate/flutter_animate.dart';
import '../../widgets/glass_card.dart';
import '../../models/tournament_model.dart';
import '../../widgets/tournament_card.dart';

class GameTournamentsScreen extends StatefulWidget {
  final String game;
  final bool isOnline;

  const GameTournamentsScreen({
    super.key,
    required this.game,
    required this.isOnline,
  });

  @override
  State<GameTournamentsScreen> createState() => _GameTournamentsScreenState();
}

class _GameTournamentsScreenState extends State<GameTournamentsScreen> {
  String _searchQuery = '';
  String _filterType = 'all';

  List<TournamentModel> get _tournaments {
    return [
      TournamentModel(
        id: '1',
        title: '${widget.game} Pro Championship',
        game: widget.game,
        type: widget.isOnline ? 'online' : 'offline',
        status: 'open',
        maxTeams: 64,
        currentTeams: 45,
        entryFee: 500,
        prizePool: 50000,
        registrationDeadline: DateTime.now().add(const Duration(hours: 18)),
        startTime: DateTime.now().add(const Duration(days: 2, hours: 15)),
        mode: 'Squad Elimination',
        organizer: 'GameYo Pro',
        featured: true,
        rounds: 4,
      ),
      TournamentModel(
        id: '2',
        title: '${widget.game} Weekly Arena',
        game: widget.game,
        type: widget.isOnline ? 'online' : 'offline',
        status: 'open',
        maxTeams: 32,
        currentTeams: 28,
        entryFee: 200,
        prizePool: 15000,
        registrationDeadline: DateTime.now().add(const Duration(hours: 20)),
        startTime: DateTime.now().add(const Duration(days: 1, hours: 19)),
        mode: 'Battle Royale',
        organizer: 'Arena Masters',
        featured: false,
        rounds: 3,
      ),
      TournamentModel(
        id: '3',
        title: '${widget.game} Elite Cup',
        game: widget.game,
        type: widget.isOnline ? 'online' : 'offline',
        status: 'full',
        maxTeams: 16,
        currentTeams: 16,
        entryFee: 1000,
        prizePool: 75000,
        registrationDeadline: DateTime.now().subtract(const Duration(hours: 6)),
        startTime: DateTime.now().add(const Duration(hours: 10)),
        mode: 'LAN Tournament',
        organizer: 'Elite Gaming Hub',
        featured: true,
        location: 'Mumbai Gaming Arena',
        rounds: 5,
      ),
    ];
  }

  List<TournamentModel> get _filteredTournaments {
    return _tournaments.where((tournament) {
      final matchesSearch = tournament.title.toLowerCase().contains(_searchQuery.toLowerCase()) ||
          tournament.organizer.toLowerCase().contains(_searchQuery.toLowerCase());

      if (!matchesSearch) return false;

      if (_filterType == 'online') return tournament.type == 'online';
      if (_filterType == 'offline') return tournament.type == 'offline';

      return true;
    }).toList();
  }

  String _getTimeLeft(DateTime deadline) {
    final now = DateTime.now();
    final diff = deadline.difference(now);

    if (diff.isNegative) return "Ended";

    final days = diff.inDays;
    final hours = diff.inHours % 24;

    if (days > 0) return "${days}d ${hours}h";
    return "${hours}h";
  }

  @override
  Widget build(BuildContext context) {
    final theme = Theme.of(context);
    
    return Scaffold(
      body: Container(
        decoration: BoxDecoration(
          gradient: LinearGradient(
            begin: Alignment.topCenter,
            end: Alignment.bottomCenter,
            colors: [
              theme.colorScheme.surface,
              theme.colorScheme.background,
            ],
          ),
        ),
        child: SafeArea(
          child: Column(
            children: [
              // Header
              Container(
                padding: const EdgeInsets.all(24),
                decoration: BoxDecoration(
                  color: theme.colorScheme.surface.withOpacity(0.95),
                  border: Border(
                    bottom: BorderSide(
                      color: theme.colorScheme.onSurface.withOpacity(0.1),
                      width: 1,
                    ),
                  ),
                ),
                child: Column(
                  children: [
                    Row(
                      children: [
                        IconButton(
                          onPressed: () => Navigator.pop(context),
                          icon: const Icon(Icons.arrow_back),
                          style: IconButton.styleFrom(
                            backgroundColor: theme.colorScheme.surface,
                          ),
                        ),
                        const SizedBox(width: 16),
                        Expanded(
                          child: Column(
                            crossAxisAlignment: CrossAxisAlignment.start,
                            children: [
                              Text(
                                '${widget.game} Tournaments',
                                style: theme.textTheme.titleLarge?.copyWith(
                                  fontWeight: FontWeight.bold,
                                ),
                              ),
                              Text(
                                '${_filteredTournaments.length} tournaments available',
                                style: theme.textTheme.bodyMedium?.copyWith(
                                  color: theme.colorScheme.onSurface.withOpacity(0.7),
                                ),
                              ),
                            ],
                          ),
                        ),
                      ],
                    ).animate().fadeIn().slideX(begin: -0.3),
                    
                    const SizedBox(height: 16),
                    
                    // Search Bar
                    TextField(
                      onChanged: (value) => setState(() => _searchQuery = value),
                      decoration: InputDecoration(
                        hintText: 'Search tournaments...',
                        prefixIcon: const Icon(Icons.search),
                        border: OutlineInputBorder(
                          borderRadius: BorderRadius.circular(12),
                          borderSide: BorderSide.none,
                        ),
                        filled: true,
                        fillColor: theme.colorScheme.surface.withOpacity(0.5),
                      ),
                    ).animate(delay: 200.ms).fadeIn().slideY(begin: 0.3),
                    
                    const SizedBox(height: 16),
                    
                    // Filter Chips
                    SizedBox(
                      height: 40,
                      child: ListView(
                        scrollDirection: Axis.horizontal,
                        children: [
                          _buildFilterChip(context, 'all', 'All', null),
                          _buildFilterChip(context, 'online', 'Online', Icons.wifi),
                          _buildFilterChip(context, 'offline', 'Offline', Icons.wifi_off),
                        ],
                      ),
                    ).animate(delay: 400.ms).fadeIn(),
                  ],
                ),
              ),
              
              // Tournaments List
              Expanded(
                child: Padding(
                  padding: const EdgeInsets.all(24),
                  child: _filteredTournaments.isEmpty
                      ? _buildEmptyState(context)
                      : ListView.builder(
                          itemCount: _filteredTournaments.length,
                          itemBuilder: (context, index) {
                            return Padding(
                              padding: const EdgeInsets.only(bottom: 16),
                              child: TournamentCard(
                                tournament: _filteredTournaments[index],
                                onTap: () {},
                              ).animate(delay: (index * 100).ms).fadeIn().slideY(begin: 0.3),
                            );
                          },
                        ),
                ),
              ),
            ],
          ),
        ),
      ),
    );
  }

  Widget _buildFilterChip(BuildContext context, String id, String label, IconData? icon) {
    final theme = Theme.of(context);
    final isActive = _filterType == id;
    
    return Padding(
      padding: const EdgeInsets.only(right: 8),
      child: FilterChip(
        label: Row(
          mainAxisSize: MainAxisSize.min,
          children: [
            if (icon != null) ...[
              Icon(icon, size: 16),
              const SizedBox(width: 4),
            ],
            Text(label),
          ],
        ),
        selected: isActive,
        onSelected: (selected) {
          setState(() => _filterType = id);
        },
        backgroundColor: theme.colorScheme.surface,
        selectedColor: theme.colorScheme.primary,
        labelStyle: TextStyle(
          color: isActive
              ? theme.colorScheme.onPrimary
              : theme.colorScheme.onSurface,
          fontWeight: FontWeight.w500,
        ),
        shape: RoundedRectangleBorder(
          borderRadius: BorderRadius.circular(20),
        ),
      ),
    );
  }

  Widget _buildEmptyState(BuildContext context) {
    final theme = Theme.of(context);
    
    return Center(
      child: Column(
        mainAxisAlignment: MainAxisAlignment.center,
        children: [
          Icon(
            Icons.emoji_events,
            size: 64,
            color: theme.colorScheme.onSurface.withOpacity(0.3),
          ).animate().fadeIn().scale(),
          
          const SizedBox(height: 16),
          
          Text(
            'No tournaments found',
            style: theme.textTheme.titleMedium?.copyWith(
              color: theme.colorScheme.onSurface.withOpacity(0.7),
            ),
          ).animate(delay: 200.ms).fadeIn(),
          
          const SizedBox(height: 8),
          
          Text(
            'Try adjusting your search or filters',
            style: theme.textTheme.bodyMedium?.copyWith(
              color: theme.colorScheme.onSurface.withOpacity(0.5),
            ),
          ).animate(delay: 400.ms).fadeIn(),
        ],
      ),
    );
  }
}