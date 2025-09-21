import 'package:flutter/material.dart';
import 'package:flutter_animate/flutter_animate.dart';
import '../../widgets/glass_card.dart';
import '../../models/game_model.dart';
import '../../widgets/game_card.dart';
import 'game_tournaments_screen.dart';

class TournamentScreen extends StatefulWidget {
  const TournamentScreen({super.key});

  @override
  State<TournamentScreen> createState() => _TournamentScreenState();
}

class _TournamentScreenState extends State<TournamentScreen> with TickerProviderStateMixin {
  late TabController _tabController;
  String _searchQuery = '';

  final List<GameModel> _games = [
    GameModel(
      name: "BGMI",
      fullName: "Battlegrounds Mobile India",
      onlineTournaments: 12,
      offlineTournaments: 3,
      totalPlayers: "2.5K+",
      icon: "🎯",
      gradient: [const Color(0xFF6366F1), const Color(0xFF06B6D4)],
    ),
    GameModel(
      name: "Free Fire",
      fullName: "Garena Free Fire",
      onlineTournaments: 8,
      offlineTournaments: 2,
      totalPlayers: "1.8K+",
      icon: "🔥",
      gradient: [const Color(0xFFF97316), const Color(0xFFEF4444)],
    ),
    GameModel(
      name: "COD Mobile",
      fullName: "Call of Duty Mobile",
      onlineTournaments: 6,
      offlineTournaments: 4,
      totalPlayers: "1.2K+",
      icon: "⚔️",
      gradient: [const Color(0xFF8B5CF6), const Color(0xFFEC4899)],
    ),
    GameModel(
      name: "Valorant",
      fullName: "Valorant",
      onlineTournaments: 4,
      offlineTournaments: 6,
      totalPlayers: "980+",
      icon: "🎮",
      gradient: [const Color(0xFF10B981), const Color(0xFF14B8A6)],
    ),
    GameModel(
      name: "Clash Royale",
      fullName: "Clash Royale",
      onlineTournaments: 5,
      offlineTournaments: 1,
      totalPlayers: "750+",
      icon: "👑",
      gradient: [const Color(0xFF8B5CF6), const Color(0xFF3B82F6)],
    ),
    GameModel(
      name: "Brawl Stars",
      fullName: "Brawl Stars",
      onlineTournaments: 3,
      offlineTournaments: 2,
      totalPlayers: "640+",
      icon: "⭐",
      gradient: [const Color(0xFFF59E0B), const Color(0xFFEF4444)],
    ),
  ];

  @override
  void initState() {
    super.initState();
    _tabController = TabController(length: 2, vsync: this);
  }

  @override
  void dispose() {
    _tabController.dispose();
    super.dispose();
  }

  List<GameModel> get _filteredGames {
    return _games.where((game) {
      final matchesSearch = game.name.toLowerCase().contains(_searchQuery.toLowerCase()) ||
          game.fullName.toLowerCase().contains(_searchQuery.toLowerCase());

      if (!matchesSearch) return false;

      final currentTab = _tabController.index;
      if (currentTab == 0) { // Online
        return game.onlineTournaments > 0;
      } else { // Offline
        return game.offlineTournaments > 0;
      }
    }).toList();
  }

  int _getTournamentCount(int tabIndex) {
    return _games.fold(0, (sum, game) {
      if (tabIndex == 0) return sum + game.onlineTournaments;
      return sum + game.offlineTournaments;
    });
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
              _buildHeader(context),
              
              // Tab Bar
              _buildTabBar(context),
              
              // Content
              Expanded(
                child: TabBarView(
                  controller: _tabController,
                  children: [
                    _buildGamesList(context, true), // Online
                    _buildGamesList(context, false), // Offline
                  ],
                ),
              ),
            ],
          ),
        ),
      ),
    );
  }

  Widget _buildHeader(BuildContext context) {
    final theme = Theme.of(context);
    
    return Container(
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
            mainAxisAlignment: MainAxisAlignment.spaceBetween,
            children: [
              Row(
                children: [
                  Icon(
                    Icons.emoji_events,
                    color: theme.colorScheme.primary,
                    size: 28,
                  ),
                  const SizedBox(width: 8),
                  Text(
                    'Tournaments',
                    style: theme.textTheme.headlineMedium?.copyWith(
                      fontWeight: FontWeight.bold,
                    ),
                  ),
                ],
              ).animate().fadeIn().slideX(begin: -0.3),
              
              ElevatedButton.icon(
                onPressed: () {},
                icon: const Icon(Icons.add, size: 16),
                label: const Text('Create Tournament'),
                style: ElevatedButton.styleFrom(
                  padding: const EdgeInsets.symmetric(horizontal: 16, vertical: 8),
                  minimumSize: Size.zero,
                ),
              ).animate(delay: 200.ms).fadeIn().scale(),
            ],
          ),
          
          const SizedBox(height: 16),
          
          // Search Bar
          TextField(
            onChanged: (value) => setState(() => _searchQuery = value),
            decoration: InputDecoration(
              hintText: 'Search games...',
              prefixIcon: const Icon(Icons.search),
              border: OutlineInputBorder(
                borderRadius: BorderRadius.circular(12),
                borderSide: BorderSide.none,
              ),
              filled: true,
              fillColor: theme.colorScheme.surface.withOpacity(0.5),
            ),
          ).animate(delay: 400.ms).fadeIn().slideY(begin: 0.3),
        ],
      ),
    );
  }

  Widget _buildTabBar(BuildContext context) {
    final theme = Theme.of(context);
    
    return Container(
      color: theme.colorScheme.surface.withOpacity(0.95),
      child: TabBar(
        controller: _tabController,
        onTap: (index) => setState(() {}),
        tabs: [
          Tab(
            child: Row(
              mainAxisAlignment: MainAxisAlignment.center,
              children: [
                const Icon(Icons.wifi, size: 16),
                const SizedBox(width: 8),
                const Text('Online'),
              ],
            ),
          ),
          Tab(
            child: Row(
              mainAxisAlignment: MainAxisAlignment.center,
              children: [
                const Icon(Icons.wifi_off, size: 16),
                const SizedBox(width: 8),
                const Text('Offline'),
              ],
            ),
          ),
        ],
        labelColor: theme.colorScheme.primary,
        unselectedLabelColor: theme.colorScheme.onSurface.withOpacity(0.7),
        indicatorColor: theme.colorScheme.primary,
      ),
    );
  }

  Widget _buildGamesList(BuildContext context, bool isOnline) {
    final theme = Theme.of(context);
    
    return Column(
      children: [
        // Results Summary
        Padding(
          padding: const EdgeInsets.all(24),
          child: Row(
            mainAxisAlignment: MainAxisAlignment.spaceBetween,
            children: [
              Text(
                '${_filteredGames.length} games available in ${isOnline ? 'online' : 'offline'}',
                style: theme.textTheme.bodyMedium?.copyWith(
                  color: theme.colorScheme.onSurface.withOpacity(0.7),
                ),
              ),
            ],
          ).animate().fadeIn().slideX(begin: -0.3),
        ),
        
        // Games List
        Expanded(
          child: ListView.builder(
            padding: const EdgeInsets.symmetric(horizontal: 24),
            itemCount: _filteredGames.length,
            itemBuilder: (context, index) {
              final game = _filteredGames[index];
              return Padding(
                padding: const EdgeInsets.only(bottom: 16),
                child: _buildGameListItem(context, game, isOnline)
                    .animate(delay: (index * 100).ms)
                    .fadeIn()
                    .slideY(begin: 0.3),
              );
            },
          ),
        ),
        
        // Quick Stats
        Padding(
          padding: const EdgeInsets.all(24),
          child: GlassCard(
            child: Padding(
              padding: const EdgeInsets.all(16),
              child: Row(
                mainAxisAlignment: MainAxisAlignment.spaceAround,
                children: [
                  _buildStatColumn(
                    context,
                    '${_games.fold(0, (sum, game) => sum + game.onlineTournaments)}',
                    'Online Tournaments',
                    Colors.green,
                  ),
                  Container(
                    width: 1,
                    height: 40,
                    color: theme.colorScheme.onSurface.withOpacity(0.2),
                  ),
                  _buildStatColumn(
                    context,
                    '${_games.fold(0, (sum, game) => sum + game.offlineTournaments)}',
                    'Offline Tournaments',
                    Colors.orange,
                  ),
                  Container(
                    width: 1,
                    height: 40,
                    color: theme.colorScheme.onSurface.withOpacity(0.2),
                  ),
                  _buildStatColumn(
                    context,
                    '${_games.fold(0, (sum, game) => sum + game.onlineTournaments + game.offlineTournaments)}',
                    'Total',
                    theme.colorScheme.primary,
                  ),
                ],
              ),
            ),
          ).animate(delay: 600.ms).fadeIn().slideY(begin: 0.3),
        ),
      ],
    );
  }

  Widget _buildGameListItem(BuildContext context, GameModel game, bool isOnline) {
    final theme = Theme.of(context);
    final tournamentCount = isOnline ? game.onlineTournaments : game.offlineTournaments;
    
    return GestureDetector(
      onTap: () {
        Navigator.push(
          context,
          MaterialPageRoute(
            builder: (context) => GameTournamentsScreen(
              game: game.name,
              isOnline: isOnline,
            ),
          ),
        );
      },
      child: GlassCard(
        child: Container(
          padding: const EdgeInsets.all(16),
          decoration: BoxDecoration(
            gradient: LinearGradient(
              begin: Alignment.centerLeft,
              end: Alignment.centerRight,
              colors: [
                theme.colorScheme.surface.withOpacity(0.8),
                Colors.transparent,
              ],
            ),
            borderRadius: BorderRadius.circular(16),
          ),
          child: Row(
            children: [
              // Game Icon
              Container(
                width: 48,
                height: 48,
                decoration: BoxDecoration(
                  gradient: LinearGradient(
                    begin: Alignment.topLeft,
                    end: Alignment.bottomRight,
                    colors: game.gradient.map((c) => c.withOpacity(0.2)).toList(),
                  ),
                  borderRadius: BorderRadius.circular(12),
                ),
                child: Center(
                  child: Text(
                    game.icon,
                    style: const TextStyle(fontSize: 24),
                  ),
                ),
              ),
              
              const SizedBox(width: 16),
              
              // Game Info
              Expanded(
                child: Column(
                  crossAxisAlignment: CrossAxisAlignment.start,
                  children: [
                    Text(
                      game.name,
                      style: theme.textTheme.titleMedium?.copyWith(
                        fontWeight: FontWeight.w600,
                      ),
                    ),
                    const SizedBox(height: 4),
                    Text(
                      game.fullName,
                      style: theme.textTheme.bodyMedium?.copyWith(
                        color: theme.colorScheme.onSurface.withOpacity(0.7),
                      ),
                    ),
                    const SizedBox(height: 8),
                    Row(
                      children: [
                        Icon(
                          isOnline ? Icons.wifi : Icons.wifi_off,
                          size: 16,
                          color: isOnline ? Colors.green : Colors.blue,
                        ),
                        const SizedBox(width: 4),
                        Text(
                          '$tournamentCount',
                          style: theme.textTheme.bodyMedium?.copyWith(
                            fontWeight: FontWeight.w500,
                          ),
                        ),
                        const SizedBox(width: 4),
                        Text(
                          '${isOnline ? 'online' : 'offline'} tournaments',
                          style: theme.textTheme.bodySmall?.copyWith(
                            color: theme.colorScheme.onSurface.withOpacity(0.7),
                          ),
                        ),
                      ],
                    ),
                  ],
                ),
              ),
              
              // Tournament Count and Arrow
              Column(
                crossAxisAlignment: CrossAxisAlignment.end,
                children: [
                  Text(
                    game.totalPlayers,
                    style: theme.textTheme.bodySmall?.copyWith(
                      color: theme.colorScheme.onSurface.withOpacity(0.7),
                    ),
                  ),
                  const SizedBox(height: 8),
                  Row(
                    mainAxisSize: MainAxisSize.min,
                    children: [
                      Text(
                        'View Tournaments',
                        style: theme.textTheme.bodySmall?.copyWith(
                          color: theme.colorScheme.primary,
                        ),
                      ),
                      const SizedBox(width: 4),
                      Icon(
                        Icons.arrow_forward_ios,
                        size: 12,
                        color: theme.colorScheme.primary,
                      ),
                    ],
                  ),
                ],
              ),
            ],
          ),
        ),
      ),
    );
  }

  Widget _buildStatColumn(BuildContext context, String value, String label, Color color) {
    final theme = Theme.of(context);
    
    return Column(
      children: [
        Text(
          value,
          style: theme.textTheme.titleLarge?.copyWith(
            fontWeight: FontWeight.bold,
            color: color,
          ),
        ),
        const SizedBox(height: 4),
        Text(
          label,
          style: theme.textTheme.bodySmall?.copyWith(
            color: theme.colorScheme.onSurface.withOpacity(0.7),
          ),
          textAlign: TextAlign.center,
        ),
      ],
    );
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
                      mainAxisAlignment: MainAxisAlignment.spaceBetween,
                      children: [
                        Row(
                          children: [
                            Icon(
                              Icons.emoji_events,
                              color: theme.colorScheme.primary,
                              size: 28,
                            ),
                            const SizedBox(width: 8),
                            Text(
                              'Tournaments',
                              style: theme.textTheme.headlineMedium?.copyWith(
                                fontWeight: FontWeight.bold,
                              ),
                            ),
                          ],
                        ).animate().fadeIn().slideX(begin: -0.3),
                        
                        ElevatedButton.icon(
                          onPressed: () {},
                          icon: const Icon(Icons.add, size: 16),
                          label: const Text('Create Tournament'),
                          style: ElevatedButton.styleFrom(
                            padding: const EdgeInsets.symmetric(horizontal: 16, vertical: 8),
                            minimumSize: Size.zero,
                          ),
                        ).animate(delay: 200.ms).fadeIn().scale(),
                      ],
                    ),
                    
                    const SizedBox(height: 16),
                    
                    // Search Bar
                    TextField(
                      onChanged: (value) => setState(() => _searchQuery = value),
                      decoration: InputDecoration(
                        hintText: 'Search games...',
                        prefixIcon: const Icon(Icons.search),
                        border: OutlineInputBorder(
                          borderRadius: BorderRadius.circular(12),
                          borderSide: BorderSide.none,
                        ),
                        filled: true,
                        fillColor: theme.colorScheme.surface.withOpacity(0.5),
                      ),
                    ).animate(delay: 400.ms).fadeIn().slideY(begin: 0.3),
                  ],
                ),
              ),
              
              // Tab Bar
              Container(
                color: theme.colorScheme.surface.withOpacity(0.95),
                child: TabBar(
                  controller: _tabController,
                  onTap: (index) => setState(() {}),
                  tabs: [
                    Tab(
                      child: Row(
                        mainAxisAlignment: MainAxisAlignment.center,
                        children: [
                          const Icon(Icons.wifi, size: 16),
                          const SizedBox(width: 8),
                          const Text('Online'),
                        ],
                      ),
                    ),
                    Tab(
                      child: Row(
                        mainAxisAlignment: MainAxisAlignment.center,
                        children: [
                          const Icon(Icons.wifi_off, size: 16),
                          const SizedBox(width: 8),
                          const Text('Offline'),
                        ],
                      ),
                    ),
                  ],
                  labelColor: theme.colorScheme.primary,
                  unselectedLabelColor: theme.colorScheme.onSurface.withOpacity(0.7),
                  indicatorColor: theme.colorScheme.primary,
                ),
              ),
              
              // Content
              Expanded(
                child: TabBarView(
                  controller: _tabController,
                  children: [
                    _buildGamesList(context, true), // Online
                    _buildGamesList(context, false), // Offline
                  ],
                ),
              ),
            ],
          ),
        ),
      ),
    );
  }
}