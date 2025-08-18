import { PrismaClient, CheatCategoryType } from '../generated/prisma';

const prisma = new PrismaClient();

async function seedCheatCategories() {
  console.log('🌱 Starting cheat category seeding...');

  // Define categories with their priorities based on enum values
  const categories = [
    { name: CheatCategoryType.PLAYER, priority: 0 },
    { name: CheatCategoryType.INVENTORY, priority: 1 },
    { name: CheatCategoryType.STATS, priority: 2 },
    { name: CheatCategoryType.ENEMIES, priority: 3 },
    { name: CheatCategoryType.WEAPONS, priority: 4 },
    { name: CheatCategoryType.GAME, priority: 5 },
    { name: CheatCategoryType.PHYSICS, priority: 6 },
    { name: CheatCategoryType.TELEPORT, priority: 7 },
    { name: CheatCategoryType.OTHER, priority: 8 },
  ];

  try {
    // Create all cheat categories
    const createdCategories = await Promise.all(
      categories.map(async (category) => {
        return await prisma.cheatCategory.upsert({
          where: { name: category.name },
          update: { priority: category.priority },
          create: {
            name: category.name,
            priority: category.priority,
          },
        });
      }),
    );

    console.log('✅ Successfully created/updated cheat categories:');
    createdCategories.forEach((category) => {
      console.log(`  - ${category.name} (Priority: ${category.priority})`);
    });

    console.log(`\n📊 Total categories: ${createdCategories.length}`);

    return createdCategories;
  } catch (error) {
    console.error('❌ Error seeding cheat categories:', error);
    throw error;
  }
}

async function seedGamesAndCheats() {
  console.log('\n🎮 Starting game and cheat seeding...');

  try {
    // Create the game
    const game = await prisma.game.upsert({
      where: { steamAppId: 2446550 },
      update: {},
      create: {
        steamAppId: 2446550,
        name: 'STAR WARS™: Battlefront Classic Collection',
        processName: 'Battlefront.exe',
      },
    });

    console.log(`✅ Created game: ${game.name} (ID: ${game.id})`);

    // Get categories
    const playerCategory = await prisma.cheatCategory.findUnique({
      where: { name: CheatCategoryType.PLAYER },
    });

    const weaponsCategory = await prisma.cheatCategory.findUnique({
      where: { name: CheatCategoryType.WEAPONS },
    });

    const gameCategory = await prisma.cheatCategory.findUnique({
      where: { name: CheatCategoryType.GAME },
    });

    if (!playerCategory || !weaponsCategory || !gameCategory) {
      throw new Error('Required categories not found');
    }

    // Create the health cheat (PLAYER category)
    const healthCheat = await prisma.cheat.upsert({
      where: { name: 'health' },
      update: {},
      create: {
        name: 'health',
        categoryId: playerCategory.id,
      },
    });

    // Create the stamina cheat (PLAYER category)
    const staminaCheat = await prisma.cheat.upsert({
      where: { name: 'stamina' },
      update: {},
      create: {
        name: 'stamina',
        categoryId: playerCategory.id,
      },
    });

    // Create the jetpack fuel cheat (PLAYER category)
    const jetpackFuelCheat = await prisma.cheat.upsert({
      where: { name: 'jetpack_fuel' },
      update: {},
      create: {
        name: 'jetpack_fuel',
        categoryId: playerCategory.id,
      },
    });

    // Create the ammo cheat (WEAPONS category)
    const ammoCheat = await prisma.cheat.upsert({
      where: { name: 'ammo' },
      update: {},
      create: {
        name: 'ammo',
        categoryId: weaponsCategory.id,
      },
    });

    // Create the team 1 reinforcements cheat (GAME category)
    const team1ReinforcementsCheat = await prisma.cheat.upsert({
      where: { name: 'team1_reinforcements' },
      update: {},
      create: {
        name: 'team1_reinforcements',
        categoryId: gameCategory.id,
      },
    });

    // Create the team 2 reinforcements cheat (GAME category)
    const team2ReinforcementsCheat = await prisma.cheat.upsert({
      where: { name: 'team2_reinforcements' },
      update: {},
      create: {
        name: 'team2_reinforcements',
        categoryId: gameCategory.id,
      },
    });

    console.log(
      `✅ Created cheats: ${healthCheat.name}, ${staminaCheat.name}, ${jetpackFuelCheat.name}, ${ammoCheat.name}, ${team1ReinforcementsCheat.name}, ${team2ReinforcementsCheat.name}`,
    );

    // Create the GameCheat relationship for health
    const healthGameCheat = await prisma.gameCheat.upsert({
      where: {
        gameId_cheatId: {
          gameId: game.id,
          cheatId: healthCheat.id,
        },
      },
      update: {},
      create: {
        gameId: game.id,
        cheatId: healthCheat.id,
        displayName: 'Unlimited Health',
        offsets: {
          moduleName: 'Battlefront2.dll',
          baseAddress: '023DF1B0',
          offsets: [0x38],
          valueType: 'int32',
        },
        parameters: {
          min: 0,
          max: 1,
          step: 1,
        },
      },
    });

    // Create the GameCheat relationship for stamina
    const staminaGameCheat = await prisma.gameCheat.upsert({
      where: {
        gameId_cheatId: {
          gameId: game.id,
          cheatId: staminaCheat.id,
        },
      },
      update: {},
      create: {
        gameId: game.id,
        cheatId: staminaCheat.id,
        displayName: 'Unlimited Stamina',
        offsets: {
          moduleName: 'Battlefront2.dll',
          baseAddress: '023DF1C8',
          offsets: [0x268, 0xa0, 0xb0, 0xa80],
          valueType: 'int32',
        },
        parameters: {
          min: 0,
          max: 1,
          step: 1,
        },
      },
    });

    // Create the GameCheat relationship for jetpack fuel
    const jetpackFuelGameCheat = await prisma.gameCheat.upsert({
      where: {
        gameId_cheatId: {
          gameId: game.id,
          cheatId: jetpackFuelCheat.id,
        },
      },
      update: {},
      create: {
        gameId: game.id,
        cheatId: jetpackFuelCheat.id,
        displayName: 'Unlimited Jet Pack Fuel',
        offsets: {
          moduleName: 'Battlefront2.dll',
          baseAddress: '023DF1C8',
          offsets: [0x824],
          valueType: 'float',
        },
        parameters: {
          min: 0,
          max: 1,
          step: 1,
        },
      },
    });

    // Create the GameCheat relationship for ammo
    const ammoGameCheat = await prisma.gameCheat.upsert({
      where: {
        gameId_cheatId: {
          gameId: game.id,
          cheatId: ammoCheat.id,
        },
      },
      update: {},
      create: {
        gameId: game.id,
        cheatId: ammoCheat.id,
        displayName: 'Unlimited Ammo',
        offsets: {
          moduleName: 'Battlefront2.dll',
          baseAddress: '006A5380',
          offsets: [0xb8, 0x14],
          valueType: 'float',
        },
        parameters: {
          min: 0,
          max: 1,
          step: 1,
        },
      },
    });

    // Create the GameCheat relationship for team 1 reinforcements
    const team1ReinforcementsGameCheat = await prisma.gameCheat.upsert({
      where: {
        gameId_cheatId: {
          gameId: game.id,
          cheatId: team1ReinforcementsCheat.id,
        },
      },
      update: {},
      create: {
        gameId: game.id,
        cheatId: team1ReinforcementsCheat.id,
        displayName: 'Team 1 Reinforcements',
        offsets: {
          moduleName: 'Battlefront2.dll',
          baseAddress: '0063BD48',
          offsets: [0x6d0],
          valueType: 'int32',
        },
        parameters: {
          min: 1,
          max: 5000,
          step: 100,
        },
      },
    });

    // Create the GameCheat relationship for team 2 reinforcements
    const team2ReinforcementsGameCheat = await prisma.gameCheat.upsert({
      where: {
        gameId_cheatId: {
          gameId: game.id,
          cheatId: team2ReinforcementsCheat.id,
        },
      },
      update: {},
      create: {
        gameId: game.id,
        cheatId: team2ReinforcementsCheat.id,
        displayName: 'Team 2 Reinforcements',
        offsets: {
          moduleName: 'Battlefront2.dll',
          baseAddress: '00AEFF18',
          offsets: [0x48, 0xd8, 0x168, 0xfc0],
          valueType: 'int32',
        },
        parameters: {
          min: 1,
          max: 5000,
          step: 100,
        },
      },
    });

    console.log(`✅ Created game cheat relationships:`);
    console.log(`   - ${healthGameCheat.displayName} (PLAYER)`);
    console.log(`   - ${staminaGameCheat.displayName} (PLAYER)`);
    console.log(`   - ${jetpackFuelGameCheat.displayName} (PLAYER)`);
    console.log(`   - ${ammoGameCheat.displayName} (WEAPONS)`);
    console.log(`   - ${team1ReinforcementsGameCheat.displayName} (GAME)`);
    console.log(`   - ${team2ReinforcementsGameCheat.displayName} (GAME)`);
  } catch (error) {
    console.error('❌ Error seeding games and cheats:', error);
    throw error;
  }
}

async function main() {
  try {
    await seedCheatCategories();
    await seedGamesAndCheats();
    console.log('\n🎉 Seeding completed successfully!');
  } catch (error) {
    console.error('💥 Seeding failed:', error);
    process.exit(1);
  } finally {
    await prisma.$disconnect();
  }
}

// Run the seeding
main();
