import 'package:flutter/material.dart';
import 'package:flutter_animate/flutter_animate.dart';
import 'package:provider/provider.dart';
import '../../providers/app_state_provider.dart';
import '../../widgets/glass_card.dart';
import '../../models/tournament_model.dart';
import '../../models/game_model.dart';
import '../../widgets/tournament_card.dart';
import '../../widgets/game_card.dart';

class HomeScreen extends StatelessWidget {
  const HomeScreen({super.key});

  @override
  Widget build(BuildContext context) {
    final theme = Theme.of(context);
    final appState = Provider.of<AppStateProvider>(context);
    
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
          child: SingleChildScrollView(
            padding: const EdgeInsets.only(bottom: 100),
            child: Column(
              crossAxisAlignment: CrossAxisAlignment.start,
              children: [
                // Header
                _buildHeader(context),
                
                const SizedBox(height: 24),
                
                // Promo Banners
                _buildPromoBanners(context),
                
                const SizedBox(height: 32),
                
                // Popular Games
                _buildPopularGames(context, appState),
                
                const SizedBox(height: 32),
                
                // Match Categories
                _buildMatchCategories(context, appState),
                
                const SizedBox(height: 32),
                
                // Registered Matches
                _buildRegisteredMatches(context),
                
                const SizedBox(height: 32),
                
                // Featured Tournaments
                _buildFeaturedTournaments(context, appState),
              ],
            ),
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
        color: theme.colorScheme.surface,
        border: Border(
          bottom: BorderSide(
            color: theme.colorScheme.onSurface.withOpacity(0.1),
            width: 1,
          ),
        ),
      ),
      child: Row(
        mainAxisAlignment: MainAxisAlignment.spaceBetween,
        children: [
          Column(
            crossAxisAlignment: CrossAxisAlignment.start,
            children: [
              Text(
                'Good Evening!',
                style: theme.textTheme.headlineMedium?.copyWith(
                  fontWeight: FontWeight.bold,
                ),
              ).animate().fadeIn().slideX(begin: -0.3),
              
              const SizedBox(height: 4),
              
              Text(
                'Ready to dominate?',
                style: theme.textTheme.bodyLarge?.copyWith(
                  color: theme.colorScheme.onSurface.withOpacity(0.7),
                ),
              ).animate(delay: 200.ms).fadeIn().slideX(begin: -0.3),
            ],
          ),
          
          Row(
            children: [
              IconButton(
                onPressed: () {},
                icon: const Icon(Icons.search),
                style: IconButton.styleFrom(
                  backgroundColor: theme.colorScheme.surface,
                  foregroundColor: theme.colorScheme.onSurface,
                ),
              ).animate(delay: 400.ms).fadeIn().scale(),
              
              const SizedBox(width: 8),
              
              Stack(
                children: [
                  IconButton(
                    onPressed: () {},
                    icon: const Icon(Icons.notifications_outlined),
                    style: IconButton.styleFrom(
                      backgroundColor: theme.colorScheme.surface,
                      foregroundColor: theme.colorScheme.onSurface,
                    ),
                  ),
                  Positioned(
                    top: 8,
                    right: 8,
                    child: Container(
                      width: 12,
                      height: 12,
                      decoration: const BoxDecoration(
                        color: Colors.red,
                        shape: BoxShape.circle,
                      ),
                    ),
                  ),
                ],
              ).animate(delay: 600.ms).fadeIn().scale(),
            ],
          ),
        ],
      ),
    );
  }

  Widget _buildPromoBanners(BuildContext context) {
    final theme = Theme.of(context);
    
    return Padding(
      padding: const EdgeInsets.symmetric(horizontal: 24),
      child: Column(
        crossAxisAlignment: CrossAxisAlignment.start,
        children: [
          Text(
            'Featured Promotions',
            style: theme.textTheme.titleLarge?.copyWith(
              fontWeight: FontWeight.w600,
            ),
          ).animate().fadeIn().slideX(begin: -0.3),
          
          const SizedBox(height: 16),
          
          SizedBox(
            height: 160,
            child: ListView.builder(
              scrollDirection: Axis.horizontal,
              itemCount: 2,
              itemBuilder: (context, index) {
                return Container(
                  width: 320,
                  margin: const EdgeInsets.only(right: 16),
                  child: GlassCard(
                    borderRadius: BorderRadius.circular(20),
                    child: Container(
                      decoration: BoxDecoration(
                        borderRadius: BorderRadius.circular(20),
                        gradient: LinearGradient(
                          begin: Alignment.topLeft,
                          end: Alignment.bottomRight,
                          colors: [
                            theme.colorScheme.primary.withOpacity(0.8),
                            theme.colorScheme.secondary.withOpacity(0.8),
                          ],
                        ),
                      ),
                      padding: const EdgeInsets.all(20),
                      child: Column(
                        crossAxisAlignment: CrossAxisAlignment.start,
                        mainAxisAlignment: MainAxisAlignment.end,
                        children: [
                          Text(
                            'Win Big This Weekend!',
                            style: theme.textTheme.titleMedium?.copyWith(
                              color: Colors.white,
                              fontWeight: FontWeight.bold,
                            ),
                          ),
                          const SizedBox(height: 4),
                          Text(
                            'Join tournament now',
                            style: theme.textTheme.bodySmall?.copyWith(
                              color: Colors.white.withOpacity(0.9),
                            ),
                          ),
                        ],
                      ),
                    ),
                  ),
                ).animate(delay: (index * 200).ms).fadeIn().slideX(begin: 0.3);
              },
            ),
          ),
        ],
      ),
    );
  }

  Widget _buildPopularGames(BuildContext context, AppStateProvider appState) {
    final theme = Theme.of(context);
    
    final games = [
      GameModel(
        name: "BGMI",
        fullName: "Battlegrounds Mobile India",
        icon: "🎯",
        tournaments: 15,
        gradient: [const Color(0xFF6366F1), const Color(0xFF06B6D4)],
      ),
      GameModel(
        name: "Free Fire",
        fullName: "Garena Free Fire",
        icon: "🔥",
        tournaments: 10,
        gradient: [const Color(0xFFF97316), const Color(0xFFEF4444)],
      ),
      GameModel(
        name: "COD Mobile",
        fullName: "Call of Duty Mobile",
        icon: "⚔️",
        tournaments: 8,
        gradient: [const Color(0xFF8B5CF6), const Color(0xFFEC4899)],
      ),
      GameModel(
        name: "Valorant",
        fullName: "Valorant",
        icon: "🎮",
        tournaments: 6,
        gradient: [const Color(0xFF10B981), const Color(0xFF14B8A6)],
      ),
      GameModel(
        name: "CS2",
        fullName: "Counter-Strike 2",
        icon: "💀",
        tournaments: 4,
        gradient: [const Color(0xFF6B7280), const Color(0xFF374151)],
      ),
    ];

    return Padding(
      padding: const EdgeInsets.symmetric(horizontal: 24),
      child: Column(
        crossAxisAlignment: CrossAxisAlignment.start,
        children: [
          Row(
            mainAxisAlignment: MainAxisAlignment.spaceBetween,
            children: [
              Row(
                children: [
                  const Text('🎮', style: TextStyle(fontSize: 24)),
                  const SizedBox(width: 8),
                  Text(
                    'Popular Games',
                    style: theme.textTheme.titleLarge?.copyWith(
                      fontWeight: FontWeight.w600,
                    ),
                  ),
                ],
              ),
              TextButton(
                onPressed: () => appState.setActiveTab(AppTab.tournaments),
                child: const Text('View All'),
              ),
            ],
          ).animate().fadeIn().slideX(begin: -0.3),
          
          const SizedBox(height: 16),
          
          SizedBox(
            height: 140,
            child: ListView.builder(
              scrollDirection: Axis.horizontal,
              itemCount: games.length,
              itemBuilder: (context, index) {
                return GameCard(
                  game: games[index],
                  onTap: () => appState.setActiveTab(AppTab.tournaments),
                ).animate(delay: (index * 100).ms).fadeIn().slideX(begin: 0.3);
              },
            ),
          ),
        ],
      ),
    );
  }

  Widget _buildMatchCategories(BuildContext context, AppStateProvider appState) {
    final theme = Theme.of(context);
    
    return Padding(
      padding: const EdgeInsets.symmetric(horizontal: 24),
      child: Column(
        crossAxisAlignment: CrossAxisAlignment.start,
        children: [
          Text(
            'Match Categories',
            style: theme.textTheme.titleLarge?.copyWith(
              fontWeight: FontWeight.w600,
            ),
          ).animate().fadeIn().slideX(begin: -0.3),
          
          const SizedBox(height: 16),
          
          Row(
            children: [
              Expanded(
                child: _buildCategoryCard(
                  context,
                  'Online Matches',
                  'Compete globally from home',
                  '🌐',
                  '24 Active',
                  [const Color(0xFF3B82F6), const Color(0xFF06B6D4)],
                  () => appState.setActiveTab(AppTab.matches),
                ).animate(delay: 200.ms).fadeIn().slideY(begin: 0.3),
              ),
              
              const SizedBox(width: 16),
              
              Expanded(
                child: _buildCategoryCard(
                  context,
                  'Offline Matches',
                  'Battle in person, win big',
                  '📍',
                  '8 Near You',
                  [const Color(0xFFF97316), const Color(0xFFEF4444)],
                  () => appState.setActiveTab(AppTab.matches),
                ).animate(delay: 400.ms).fadeIn().slideY(begin: 0.3),
              ),
            ],
          ),
        ],
      ),
    );
  }

  Widget _buildCategoryCard(
    BuildContext context,
    String title,
    String description,
    String emoji,
    String badge,
    List<Color> gradientColors,
    VoidCallback onTap,
  ) {
    final theme = Theme.of(context);
    
    return GestureDetector(
      onTap: onTap,
      child: Container(
        padding: const EdgeInsets.all(20),
        decoration: BoxDecoration(
          gradient: LinearGradient(
            begin: Alignment.topLeft,
            end: Alignment.bottomRight,
            colors: gradientColors.map((c) => c.withOpacity(0.2)).toList(),
          ),
          borderRadius: BorderRadius.circular(20),
          border: Border.all(
            color: theme.colorScheme.onSurface.withOpacity(0.1),
          ),
        ),
        child: Column(
          children: [
            Container(
              width: 48,
              height: 48,
              decoration: BoxDecoration(
                color: gradientColors[0].withOpacity(0.2),
                borderRadius: BorderRadius.circular(12),
              ),
              child: Center(
                child: Text(emoji, style: const TextStyle(fontSize: 24)),
              ),
            ),
            
            const SizedBox(height: 12),
            
            Text(
              title,
              style: theme.textTheme.titleMedium?.copyWith(
                fontWeight: FontWeight.w600,
              ),
              textAlign: TextAlign.center,
            ),
            
            const SizedBox(height: 4),
            
            Text(
              description,
              style: theme.textTheme.bodySmall?.copyWith(
                color: theme.colorScheme.onSurface.withOpacity(0.7),
              ),
              textAlign: TextAlign.center,
            ),
            
            const SizedBox(height: 12),
            
            Container(
              padding: const EdgeInsets.symmetric(horizontal: 8, vertical: 4),
              decoration: BoxDecoration(
                color: gradientColors[0].withOpacity(0.2),
                borderRadius: BorderRadius.circular(8),
                border: Border.all(
                  color: gradientColors[0].withOpacity(0.3),
                ),
              ),
              child: Text(
                badge,
                style: theme.textTheme.bodySmall?.copyWith(
                  color: gradientColors[0],
                  fontWeight: FontWeight.w500,
                ),
              ),
            ),
          ],
        ),
      ),
    );
  }

  Widget _buildRegisteredMatches(BuildContext context) {
    final theme = Theme.of(context);
    
    final registeredMatches = [
      {
        'title': 'BGMI Championship',
        'game': 'BGMI',
        'mode': 'Squad',
        'status': 'upcoming',
        'startTime': '2h 30m',
        'entryFee': '₹50',
        'position': 'Confirmed',
      },
      {
        'title': 'Free Fire Weekly',
        'game': 'Free Fire',
        'mode': 'Solo',
        'status': 'live',
        'startTime': 'Live Now',
        'entryFee': '₹25',
        'position': 'Playing',
      },
      {
        'title': 'COD Mobile Arena',
        'game': 'COD Mobile',
        'mode': 'Team',
        'status': 'upcoming',
        'startTime': '1d 4h',
        'entryFee': '₹75',
        'position': 'Confirmed',
      },
    ];

    return Padding(
      padding: const EdgeInsets.symmetric(horizontal: 24),
      child: Column(
        crossAxisAlignment: CrossAxisAlignment.start,
        children: [
          Row(
            mainAxisAlignment: MainAxisAlignment.spaceBetween,
            children: [
              Text(
                'My Registered Matches',
                style: theme.textTheme.titleLarge?.copyWith(
                  fontWeight: FontWeight.w600,
                ),
              ),
              TextButton(
                onPressed: () {},
                child: const Text('View All'),
              ),
            ],
          ).animate().fadeIn().slideX(begin: -0.3),
          
          const SizedBox(height: 16),
          
          SizedBox(
            height: 140,
            child: ListView.builder(
              scrollDirection: Axis.horizontal,
              itemCount: registeredMatches.length,
              itemBuilder: (context, index) {
                final match = registeredMatches[index];
                return Container(
                  width: 280,
                  margin: const EdgeInsets.only(right: 16),
                  child: GlassCard(
                    borderRadius: BorderRadius.circular(20),
                    child: Padding(
                      padding: const EdgeInsets.all(16),
                      child: Column(
                        crossAxisAlignment: CrossAxisAlignment.start,
                        children: [
                          Row(
                            mainAxisAlignment: MainAxisAlignment.spaceBetween,
                            children: [
                              Expanded(
                                child: Column(
                                  crossAxisAlignment: CrossAxisAlignment.start,
                                  children: [
                                    Row(
                                      children: [
                                        Expanded(
                                          child: Text(
                                            match['title']!,
                                            style: theme.textTheme.titleMedium?.copyWith(
                                              fontWeight: FontWeight.w600,
                                            ),
                                          ),
                                        ),
                                        Container(
                                          padding: const EdgeInsets.symmetric(
                                            horizontal: 8,
                                            vertical: 4,
                                          ),
                                          decoration: BoxDecoration(
                                            color: match['status'] == 'live'
                                                ? Colors.red.withOpacity(0.2)
                                                : theme.colorScheme.secondary,
                                            borderRadius: BorderRadius.circular(8),
                                          ),
                                          child: Text(
                                            match['status'] == 'live' ? 'LIVE' : match['mode']!,
                                            style: theme.textTheme.bodySmall?.copyWith(
                                              color: match['status'] == 'live'
                                                  ? Colors.red
                                                  : theme.colorScheme.onSecondary,
                                              fontWeight: FontWeight.w500,
                                            ),
                                          ),
                                        ),
                                      ],
                                    ),
                                    const SizedBox(height: 4),
                                    Text(
                                      match['game']!,
                                      style: theme.textTheme.bodySmall?.copyWith(
                                        color: theme.colorScheme.onSurface.withOpacity(0.7),
                                      ),
                                    ),
                                  ],
                                ),
                              ),
                              Column(
                                crossAxisAlignment: CrossAxisAlignment.end,
                                children: [
                                  Text(
                                    'Entry',
                                    style: theme.textTheme.bodySmall?.copyWith(
                                      color: theme.colorScheme.onSurface.withOpacity(0.7),
                                    ),
                                  ),
                                  Text(
                                    match['entryFee']!,
                                    style: theme.textTheme.titleSmall?.copyWith(
                                      color: theme.colorScheme.primary,
                                      fontWeight: FontWeight.bold,
                                    ),
                                  ),
                                ],
                              ),
                            ],
                          ),
                          
                          const Spacer(),
                          
                          Row(
                            mainAxisAlignment: MainAxisAlignment.spaceBetween,
                            children: [
                              Row(
                                children: [
                                  Icon(
                                    Icons.access_time,
                                    size: 16,
                                    color: theme.colorScheme.onSurface.withOpacity(0.7),
                                  ),
                                  const SizedBox(width: 4),
                                  Text(
                                    match['startTime']!,
                                    style: theme.textTheme.bodySmall?.copyWith(
                                      color: match['status'] == 'live'
                                          ? Colors.red
                                          : theme.colorScheme.secondary,
                                      fontWeight: FontWeight.w500,
                                    ),
                                  ),
                                  const SizedBox(width: 16),
                                  Icon(
                                    Icons.star,
                                    size: 16,
                                    color: theme.colorScheme.onSurface.withOpacity(0.7),
                                  ),
                                  const SizedBox(width: 4),
                                  Text(
                                    match['position']!,
                                    style: theme.textTheme.bodySmall?.copyWith(
                                      color: Colors.green,
                                      fontWeight: FontWeight.w500,
                                    ),
                                  ),
                                ],
                              ),
                              ElevatedButton(
                                onPressed: () {},
                                style: ElevatedButton.styleFrom(
                                  backgroundColor: match['status'] == 'live'
                                      ? theme.colorScheme.primary
                                      : theme.colorScheme.surface,
                                  foregroundColor: match['status'] == 'live'
                                      ? theme.colorScheme.onPrimary
                                      : theme.colorScheme.onSurface,
                                  padding: const EdgeInsets.symmetric(
                                    horizontal: 16,
                                    vertical: 8,
                                  ),
                                  minimumSize: Size.zero,
                                ),
                                child: Text(
                                  match['status'] == 'live' ? 'Join Now' : 'View',
                                  style: const TextStyle(fontSize: 12),
                                ),
                              ),
                            ],
                          ),
                        ],
                      ),
                    ),
                  ),
                ).animate(delay: (index * 200).ms).fadeIn().slideX(begin: 0.3);
              },
            ),
          ),
        ],
      ),
    );
  }

  Widget _buildFeaturedTournaments(BuildContext context, AppStateProvider appState) {
    final theme = Theme.of(context);
    
    final featuredTournaments = [
      TournamentModel(
        id: '1',
        title: 'BGMI Pro Championship',
        game: 'BGMI',
        entryFee: 500,
        prizePool: 50000,
        maxTeams: 64,
        currentTeams: 45,
        mode: 'Squad Elimination',
        timeLeft: '2h 30m',
        type: 'online',
        status: 'open',
        featured: true,
        organizer: 'GameYo Pro',
        rounds: 4,
      ),
      TournamentModel(
        id: '2',
        title: 'Free Fire Elite Cup',
        game: 'Free Fire',
        entryFee: 1000,
        prizePool: 75000,
        maxTeams: 16,
        currentTeams: 16,
        mode: 'LAN Tournament',
        timeLeft: 'Live Now',
        type: 'offline',
        status: 'full',
        featured: true,
        organizer: 'Elite Gaming Hub',
        location: 'Mumbai Gaming Arena',
        rounds: 5,
      ),
      TournamentModel(
        id: '3',
        title: 'COD Mobile Weekly Arena',
        game: 'COD Mobile',
        entryFee: 200,
        prizePool: 15000,
        maxTeams: 32,
        currentTeams: 28,
        mode: 'Battle Royale',
        timeLeft: '4h 15m',
        type: 'online',
        status: 'open',
        featured: false,
        organizer: 'Arena Masters',
        rounds: 3,
      ),
    ];

    return Padding(
      padding: const EdgeInsets.symmetric(horizontal: 24),
      child: Column(
        crossAxisAlignment: CrossAxisAlignment.start,
        children: [
          Row(
            mainAxisAlignment: MainAxisAlignment.spaceBetween,
            children: [
              Row(
                children: [
                  Icon(
                    Icons.emoji_events,
                    color: theme.colorScheme.primary,
                    size: 24,
                  ),
                  const SizedBox(width: 8),
                  Text(
                    'Featured Tournaments',
                    style: theme.textTheme.titleLarge?.copyWith(
                      fontWeight: FontWeight.w600,
                    ),
                  ),
                ],
              ),
              TextButton(
                onPressed: () => appState.setActiveTab(AppTab.tournaments),
                child: const Text('View All'),
              ),
            ],
          ).animate().fadeIn().slideX(begin: -0.3),
          
          const SizedBox(height: 16),
          
          Column(
            children: featuredTournaments.take(3).map((tournament) {
              final index = featuredTournaments.indexOf(tournament);
              return Padding(
                padding: const EdgeInsets.only(bottom: 16),
                child: TournamentCard(
                  tournament: tournament,
                  onTap: () {},
                ).animate(delay: (index * 200).ms).fadeIn().slideY(begin: 0.3),
              );
            }).toList(),
          ),
          
          // Quick Tournament Stats
          GlassCard(
            child: Padding(
              padding: const EdgeInsets.all(16),
              child: Row(
                mainAxisAlignment: MainAxisAlignment.spaceAround,
                children: [
                  _buildStatItem(
                    context,
                    '${featuredTournaments.where((t) => t.status == 'open').length}',
                    'Open Tournaments',
                    theme.colorScheme.primary,
                  ),
                  Container(
                    width: 1,
                    height: 40,
                    color: theme.colorScheme.onSurface.withOpacity(0.2),
                  ),
                  _buildStatItem(
                    context,
                    '₹${featuredTournaments.fold<int>(0, (sum, t) => sum + t.prizePool).toString().replaceAllMapped(RegExp(r'(\d{1,3})(?=(\d{3})+(?!\d))'), (Match m) => '${m[1]},')}',
                    'Total Prize Pool',
                    theme.colorScheme.secondary,
                  ),
                ],
              ),
            ),
          ).animate(delay: 800.ms).fadeIn().slideY(begin: 0.3),
        ],
      ),
    );
  }

  Widget _buildStatItem(BuildContext context, String value, String label, Color color) {
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
}