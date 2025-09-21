import 'package:flutter/material.dart';

class GameModel {
  final String name;
  final String fullName;
  final int onlineTournaments;
  final int offlineTournaments;
  final String totalPlayers;
  final String icon;
  final List<Color> gradient;

  GameModel({
    required this.name,
    required this.fullName,
    required this.onlineTournaments,
    required this.offlineTournaments,
    required this.totalPlayers,
    required this.icon,
    required this.gradient,
  });

  int get tournaments => onlineTournaments + offlineTournaments;
}