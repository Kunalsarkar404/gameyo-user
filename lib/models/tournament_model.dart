class TournamentModel {
  final String id;
  final String title;
  final String game;
  final String type; // 'online' or 'offline'
  final String status; // 'open', 'full', 'upcoming', 'live'
  final int maxTeams;
  final int currentTeams;
  final int entryFee;
  final int prizePool;
  final DateTime registrationDeadline;
  final DateTime startTime;
  final String mode;
  final String organizer;
  final bool featured;
  final String? location;
  final int rounds;

  TournamentModel({
    required this.id,
    required this.title,
    required this.game,
    required this.type,
    required this.status,
    required this.maxTeams,
    required this.currentTeams,
    required this.entryFee,
    required this.prizePool,
    required this.registrationDeadline,
    required this.startTime,
    required this.mode,
    required this.organizer,
    required this.featured,
    this.location,
    required this.rounds,
  });

  double get registrationProgress => (currentTeams / maxTeams) * 100;

  String get timeLeft {
    final now = DateTime.now();
    final diff = registrationDeadline.difference(now);

    if (diff.isNegative) return "Ended";

    final days = diff.inDays;
    final hours = diff.inHours % 24;

    if (days > 0) return "${days}d ${hours}h";
    return "${hours}h";
  }

  Color getStatusColor() {
    switch (status) {
      case 'open':
        return Colors.green;
      case 'full':
        return Colors.red;
      case 'upcoming':
        return Colors.blue;
      case 'live':
        return Colors.red;
      default:
        return Colors.grey;
    }
  }
}