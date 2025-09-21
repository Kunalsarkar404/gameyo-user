class MatchModel {
  final String id;
  final String title;
  final String game;
  final String platform; // 'Mobile' or 'PC'
  final String type; // 'Online' or 'Offline'
  final String mode;
  final String entryFee;
  final String prizePool;
  final String participants;
  final DateTime startTime;
  final String organizer;
  final String status;
  final bool featured;

  MatchModel({
    required this.id,
    required this.title,
    required this.game,
    required this.platform,
    required this.type,
    required this.mode,
    required this.entryFee,
    required this.prizePool,
    required this.participants,
    required this.startTime,
    required this.organizer,
    required this.status,
    required this.featured,
  });

  String get timeLeft {
    final now = DateTime.now();
    final diff = startTime.difference(now);

    if (diff.isNegative) return "Started";

    final hours = diff.inHours;
    final minutes = diff.inMinutes % 60;

    if (hours > 24) {
      final days = (hours / 24).floor();
      return "${days}d ${hours % 24}h";
    }

    return "${hours}h ${minutes}m";
  }
}