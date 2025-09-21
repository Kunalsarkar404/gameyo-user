import 'package:flutter/material.dart';
import 'package:flutter_animate/flutter_animate.dart';
import 'package:provider/provider.dart';
import '../../providers/app_state_provider.dart';
import '../../widgets/glass_card.dart';
import '../../models/match_model.dart';
import '../../widgets/match_card.dart';

class MatchScreen extends StatefulWidget {
  const MatchScreen({super.key});

  @override
  State<MatchScreen> createState() => _MatchScreenState();
}

class _MatchScreenState extends State<MatchScreen> with TickerProviderStateMixin {
  late TabController _tabController;
  String _activeFilter = 'all';
  String _searchQuery = '';

  final List<String> _filters = [
    'all',
    'featured',
    'mobile',
    'pc',
    'online',
    'offline'
  ];

  final List<MatchModel> _matches = [
    MatchModel(
      id: '1',
      title: 'BGMI Championship Series',
      game: 'BGMI',
      platform: 'Mobile',
      type: 'Online',
      mode: 'Squad',
      entryFee: '₹100',
      prizePool: '₹25,000',
      participants: '156/256',
      startTime: DateTime.now().add(const Duration(hours: 2)),
      organizer: 'GameYo Official',
      status: 'open',
      featured: true,
    ),
    MatchModel(
      id: '2',
      title: 'Free Fire Clash Royale',
      game: 'Free Fire',
      platform: 'Mobile',
      type: 'Online',
      mode: 'Solo',
      entryFee: '₹50',
      prizePool: '₹10,000',
      participants: '89/128',
      startTime: DateTime.now().add(const Duration(hours: 4)),
      organizer: 'Pro Gamers Club',
      status: 'open',
      featured: false,
    ),
    MatchModel(
      id: '3',
      title: 'COD Mobile Match',
      game: 'COD Mobile',
      platform: 'Mobile',
      type: 'Online',
      mode: 'Team',
      entryFee: '₹75',
      prizePool: '₹15,000',
      participants: '67/100',
      startTime: DateTime.now().add(const Duration(hours: 6)),
      organizer: 'Elite Gaming',
      status: 'open',
      featured: true,
    ),
    MatchModel(
      id: '4',
      title: 'Valorant PC Championship',
      game: 'Valorant',
      platform: 'PC',
      type: 'Offline',
      mode: 'Team',
      entryFee: '₹200',
      prizePool: '₹50,000',
      participants: '24/32',
      startTime: DateTime.now().add(const Duration(days: 2)),
      organizer: 'Mumbai Gaming Hub',
      status: 'open',
      featured: true,
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

  List<MatchModel> get _filteredMatches {
    return _matches.where((match) {
      final matchesSearch = match.title.toLowerCase().contains(_searchQuery.toLowerCase()) ||
          match.game.toLowerCase().contains(_searchQuery.toLowerCase());

      if (!matchesSearch) return false;

      switch (_activeFilter) {
        case 'all':
          return true;
        case 'featured':
          return match.featured;
        case 'mobile':
          return match.platform == 'Mobile';
        case 'pc':
          return match.platform == 'PC';
        case 'online':
          return match.type == 'Online';
        case 'offline':
          return match.type == 'Offline';
        default:
          return true;
      }
    }).toList();
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
                    _buildBrowseTab(context),
                    _buildMyMatchesTab(context),
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
        color: theme.colorScheme.surface,
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
              Text(
                'Matches',
                style: theme.textTheme.headlineMedium?.copyWith(
                  fontWeight: FontWeight.bold,
                ),
              ).animate().fadeIn().slideX(begin: -0.3),
              
              Row(
                children: [
                  IconButton(
                    onPressed: () {},
                    icon: const Icon(Icons.filter_list),
                  ).animate(delay: 200.ms).fadeIn().scale(),
                  
                  ElevatedButton.icon(
                    onPressed: () {},
                    icon: const Icon(Icons.add, size: 16),
                    label: const Text('Create Match'),
                    style: ElevatedButton.styleFrom(
                      padding: const EdgeInsets.symmetric(horizontal: 16, vertical: 8),
                      minimumSize: Size.zero,
                    ),
                  ).animate(delay: 400.ms).fadeIn().scale(),
                ],
              ),
            ],
          ),
          
          const SizedBox(height: 16),
          
          // Search Bar
          TextField(
            onChanged: (value) => setState(() => _searchQuery = value),
            decoration: InputDecoration(
              hintText: 'Search matches, games...',
              prefixIcon: const Icon(Icons.search),
              border: OutlineInputBorder(
                borderRadius: BorderRadius.circular(12),
                borderSide: BorderSide.none,
              ),
              filled: true,
              fillColor: theme.colorScheme.surface.withOpacity(0.5),
            ),
          ).animate(delay: 600.ms).fadeIn().slideY(begin: 0.3),
          
          const SizedBox(height: 16),
          
          // Filter Chips
          SizedBox(
            height: 40,
            child: ListView.builder(
              scrollDirection: Axis.horizontal,
              itemCount: _filters.length,
              itemBuilder: (context, index) {
                final filter = _filters[index];
                final isActive = _activeFilter == filter;
                
                return Padding(
                  padding: const EdgeInsets.only(right: 8),
                  child: FilterChip(
                    label: Text(
                      filter.replaceFirst(filter[0], filter[0].toUpperCase()),
                      style: TextStyle(
                        color: isActive
                            ? theme.colorScheme.onPrimary
                            : theme.colorScheme.onSurface,
                        fontWeight: FontWeight.w500,
                      ),
                    ),
                    selected: isActive,
                    onSelected: (selected) {
                      setState(() => _activeFilter = filter);
                    },
                    backgroundColor: theme.colorScheme.surface,
                    selectedColor: theme.colorScheme.primary,
                    shape: RoundedRectangleBorder(
                      borderRadius: BorderRadius.circular(20),
                    ),
                  ).animate(delay: (index * 100).ms).fadeIn().scale(),
                );
              },
            ),
          ),
        ],
      ),
    );
  }

  Widget _buildTabBar(BuildContext context) {
    final theme = Theme.of(context);
    
    return Container(
      color: theme.colorScheme.surface,
      child: TabBar(
        controller: _tabController,
        tabs: const [
          Tab(text: 'Browse'),
          Tab(text: 'My Matches'),
        ],
        labelColor: theme.colorScheme.primary,
        unselectedLabelColor: theme.colorScheme.onSurface.withOpacity(0.7),
        indicatorColor: theme.colorScheme.primary,
      ),
    );
  }

  Widget _buildBrowseTab(BuildContext context) {
    return Padding(
      padding: const EdgeInsets.all(24),
      child: ListView.builder(
        itemCount: _filteredMatches.length,
        itemBuilder: (context, index) {
          return Padding(
            padding: const EdgeInsets.only(bottom: 16),
            child: MatchCard(
              match: _filteredMatches[index],
              onTap: () {},
            ).animate(delay: (index * 100).ms).fadeIn().slideY(begin: 0.3),
          );
        },
      ),
    );
  }

  Widget _buildMyMatchesTab(BuildContext context) {
    return DefaultTabController(
      length: 3,
      child: Column(
        children: [
          TabBar(
            tabs: const [
              Tab(text: 'Upcoming'),
              Tab(text: 'Ongoing'),
              Tab(text: 'Completed'),
            ],
            labelColor: Theme.of(context).colorScheme.primary,
            unselectedLabelColor: Theme.of(context).colorScheme.onSurface.withOpacity(0.7),
            indicatorColor: Theme.of(context).colorScheme.primary,
          ),
          
          Expanded(
            child: TabBarView(
              children: [
                _buildUpcomingMatches(context),
                _buildOngoingMatches(context),
                _buildCompletedMatches(context),
              ],
            ),
          ),
        ],
      ),
    );
  }

  Widget _buildUpcomingMatches(BuildContext context) {
    final theme = Theme.of(context);
    
    return Padding(
      padding: const EdgeInsets.all(24),
      child: Column(
        children: [
          GlassCard(
            child: Padding(
              padding: const EdgeInsets.all(16),
              child: Row(
                mainAxisAlignment: MainAxisAlignment.spaceBetween,
                children: [
                  Column(
                    crossAxisAlignment: CrossAxisAlignment.start,
                    children: [
                      Text(
                        'BGMI Solo Rush',
                        style: theme.textTheme.titleMedium?.copyWith(
                          fontWeight: FontWeight.w600,
                        ),
                      ),
                      const SizedBox(height: 4),
                      Text(
                        'Starts in 2h 30m',
                        style: theme.textTheme.bodyMedium?.copyWith(
                          color: theme.colorScheme.onSurface.withOpacity(0.7),
                        ),
                      ),
                    ],
                  ),
                  Column(
                    crossAxisAlignment: CrossAxisAlignment.end,
                    children: [
                      Text(
                        '₹25',
                        style: theme.textTheme.titleMedium?.copyWith(
                          fontWeight: FontWeight.w600,
                        ),
                      ),
                      Container(
                        padding: const EdgeInsets.symmetric(horizontal: 8, vertical: 4),
                        decoration: BoxDecoration(
                          color: theme.colorScheme.surface,
                          borderRadius: BorderRadius.circular(8),
                          border: Border.all(
                            color: theme.colorScheme.onSurface.withOpacity(0.2),
                          ),
                        ),
                        child: Text(
                          'confirmed',
                          style: theme.textTheme.bodySmall,
                        ),
                      ),
                    ],
                  ),
                ],
              ),
            ),
          ).animate().fadeIn().slideY(begin: 0.3),
        ],
      ),
    );
  }

  Widget _buildOngoingMatches(BuildContext context) {
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
            'No ongoing matches',
            style: theme.textTheme.titleMedium?.copyWith(
              color: theme.colorScheme.onSurface.withOpacity(0.7),
            ),
          ).animate(delay: 200.ms).fadeIn(),
        ],
      ),
    );
  }

  Widget _buildCompletedMatches(BuildContext context) {
    final theme = Theme.of(context);
    
    return Padding(
      padding: const EdgeInsets.all(24),
      child: Column(
        children: [
          GlassCard(
            child: Padding(
              padding: const EdgeInsets.all(16),
              child: Row(
                mainAxisAlignment: MainAxisAlignment.spaceBetween,
                children: [
                  Column(
                    crossAxisAlignment: CrossAxisAlignment.start,
                    children: [
                      Text(
                        'Free Fire Weekly',
                        style: theme.textTheme.titleMedium?.copyWith(
                          fontWeight: FontWeight.w600,
                        ),
                      ),
                      const SizedBox(height: 4),
                      Text(
                        'Result: 2nd Place',
                        style: theme.textTheme.bodyMedium?.copyWith(
                          color: theme.colorScheme.onSurface.withOpacity(0.7),
                        ),
                      ),
                    ],
                  ),
                  Column(
                    crossAxisAlignment: CrossAxisAlignment.end,
                    children: [
                      Text(
                        '+₹500',
                        style: theme.textTheme.titleMedium?.copyWith(
                          fontWeight: FontWeight.w600,
                          color: Colors.green,
                        ),
                      ),
                      Text(
                        'Earned',
                        style: theme.textTheme.bodySmall?.copyWith(
                          color: theme.colorScheme.onSurface.withOpacity(0.7),
                        ),
                      ),
                    ],
                  ),
                ],
              ),
            ),
          ).animate().fadeIn().slideY(begin: 0.3),
        ],
      ),
    );
  }
}