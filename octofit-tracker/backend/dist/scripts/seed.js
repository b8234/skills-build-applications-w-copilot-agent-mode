"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const database_1 = require("../database");
const models_1 = require("../models");
async function seed() {
    console.log('Seed the octofit_db database with test data');
    await (0, database_1.connectToDatabase)();
    await Promise.all([
        models_1.ActivityModel.deleteMany({}),
        models_1.LeaderboardModel.deleteMany({}),
        models_1.TeamModel.deleteMany({}),
        models_1.UserModel.deleteMany({}),
        models_1.WorkoutModel.deleteMany({}),
    ]);
    const users = await models_1.UserModel.insertMany([
        {
            username: 'ava.runner',
            fullName: 'Ava Martinez',
            email: 'ava.martinez@example.com',
            age: 29,
            fitnessLevel: 'advanced',
            goals: ['Trail half marathon', 'Improve VO2 max'],
        },
        {
            username: 'marcus.lifts',
            fullName: 'Marcus Reed',
            email: 'marcus.reed@example.com',
            age: 34,
            fitnessLevel: 'intermediate',
            goals: ['Build upper-body strength', 'Stay consistent'],
        },
        {
            username: 'noor.cycles',
            fullName: 'Noor Hassan',
            email: 'noor.hassan@example.com',
            age: 27,
            fitnessLevel: 'advanced',
            goals: ['Century ride prep', 'Mobility work'],
        },
    ]);
    const teams = await models_1.TeamModel.insertMany([
        {
            name: 'Summit Sprinters',
            city: 'Denver',
            sportFocus: 'Running',
            captain: users[0]._id,
            members: [users[0]._id, users[2]._id],
        },
        {
            name: 'Iron Pulse',
            city: 'Austin',
            sportFocus: 'Strength Training',
            captain: users[1]._id,
            members: [users[1]._id],
        },
    ]);
    await models_1.ActivityModel.insertMany([
        {
            user: users[0]._id,
            type: 'Tempo Run',
            durationMinutes: 52,
            caloriesBurned: 640,
            distanceKm: 10.4,
            completedAt: new Date('2026-06-14T07:10:00.000Z'),
        },
        {
            user: users[1]._id,
            type: 'Push Day',
            durationMinutes: 68,
            caloriesBurned: 510,
            distanceKm: 0,
            completedAt: new Date('2026-06-15T18:30:00.000Z'),
        },
        {
            user: users[2]._id,
            type: 'Endurance Ride',
            durationMinutes: 95,
            caloriesBurned: 910,
            distanceKm: 38.6,
            completedAt: new Date('2026-06-16T06:45:00.000Z'),
        },
    ]);
    await models_1.WorkoutModel.insertMany([
        {
            title: 'Hill Repeats Builder',
            category: 'Cardio',
            difficulty: 'advanced',
            durationMinutes: 50,
            assignedTo: users[0]._id,
            focusAreas: ['Speed', 'Endurance'],
        },
        {
            title: 'Upper Body Power Circuit',
            category: 'Strength',
            difficulty: 'intermediate',
            durationMinutes: 45,
            assignedTo: users[1]._id,
            focusAreas: ['Chest', 'Shoulders', 'Triceps'],
        },
        {
            title: 'Cadence and Climb Session',
            category: 'Cycling',
            difficulty: 'advanced',
            durationMinutes: 75,
            assignedTo: users[2]._id,
            focusAreas: ['Cadence', 'Climbing'],
        },
    ]);
    await models_1.LeaderboardModel.insertMany([
        {
            period: '2026-W24',
            rank: 1,
            points: 1280,
            user: users[2]._id,
            team: teams[0]._id,
        },
        {
            period: '2026-W24',
            rank: 2,
            points: 1195,
            user: users[0]._id,
            team: teams[0]._id,
        },
        {
            period: '2026-W24',
            rank: 3,
            points: 910,
            user: users[1]._id,
            team: teams[1]._id,
        },
    ]);
    console.log(`Seeded ${users.length} users and realistic sample data across all collections.`);
}
seed()
    .catch((error) => {
    console.error('Seeding failed', error);
    process.exitCode = 1;
})
    .finally(async () => {
    await mongoose_1.default.disconnect();
});
