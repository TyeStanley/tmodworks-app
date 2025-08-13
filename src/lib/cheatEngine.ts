import { invoke } from '@tauri-apps/api/core';

export interface CheatConfig {
  game_id: string;
  cheat_id: string;
  offsets: number[];
  value_type: string;
  size: number;
  is_enabled: boolean;
  current_value?: unknown;
}

export class MemoryService {
  private static instance: MemoryService;
  private isAttached = false;

  private constructor() {}

  public static getInstance(): MemoryService {
    if (!MemoryService.instance) {
      MemoryService.instance = new MemoryService();
    }
    return MemoryService.instance;
  }

  public async attachToGame(processName: string): Promise<boolean> {
    try {
      await invoke('attach_to_game', { processName });
      this.isAttached = true;
      console.log(`Successfully attached to ${processName}`);
      return true;
    } catch (error) {
      console.error('Failed to attach to game:', error);
      this.isAttached = false;
      return false;
    }
  }

  public async applyCheat(cheat: CheatConfig): Promise<boolean> {
    if (!this.isAttached) {
      console.error('Not attached to any game');
      return false;
    }

    try {
      await invoke('apply_cheat', { cheatConfig: cheat });
      console.log(`Successfully applied cheat: ${cheat.cheat_id}`);
      return true;
    } catch (error) {
      console.error('Failed to apply cheat:', error);
      return false;
    }
  }

  public async addCheat(cheat: CheatConfig): Promise<boolean> {
    if (!this.isAttached) {
      console.error('Not attached to any game');
      return false;
    }

    try {
      await invoke('add_cheat', { cheatConfig: cheat });
      console.log(`Successfully added cheat: ${cheat.cheat_id}`);
      return true;
    } catch (error) {
      console.error('Failed to add cheat:', error);
      return false;
    }
  }

  public async removeCheat(cheatId: string): Promise<boolean> {
    try {
      await invoke('remove_cheat', { cheatId });
      console.log(`Successfully removed cheat: ${cheatId}`);
      return true;
    } catch (error) {
      console.error('Failed to remove cheat:', error);
      return false;
    }
  }

  public async startCheatLoop(): Promise<boolean> {
    if (!this.isAttached) {
      console.error('Not attached to any game');
      return false;
    }

    try {
      await invoke('start_cheat_loop');
      console.log('🚀 Started cheat loop');
      return true;
    } catch (error) {
      console.error('Failed to start cheat loop:', error);
      return false;
    }
  }

  public async stopCheatLoop(): Promise<boolean> {
    try {
      await invoke('stop_cheat_loop');
      console.log('🛑 Stopped cheat loop');
      return true;
    } catch (error) {
      console.error('Failed to stop cheat loop:', error);
      return false;
    }
  }

  public async testBattlefrontHealth(): Promise<void> {
    // Test the Battlefront II health cheat
    const healthCheat: CheatConfig = {
      game_id: 'battlefront-2',
      cheat_id: 'unlimited_health',
      offsets: [0x023df1b0, 0x38], // Battlefront II health pointer
      value_type: 'int',
      size: 4,
      is_enabled: true,
      current_value: 999999, // Set health to max
    };

    console.log('Testing Battlefront II health cheat...');
    const success = await this.applyCheat(healthCheat);

    if (success) {
      console.log('✅ Health cheat applied successfully!');
    } else {
      console.log('❌ Failed to apply health cheat');
    }
  }

  public async testCheatLoop(): Promise<void> {
    console.log('🧪 Testing cheat loop functionality...');

    // Add a health cheat to the loop
    const healthCheat: CheatConfig = {
      game_id: 'battlefront-2',
      cheat_id: 'unlimited_health',
      offsets: [0x023df1b0, 0x38],
      value_type: 'int',
      size: 4,
      is_enabled: true,
      current_value: 999999,
    };

    // Add the cheat to the active list
    await this.addCheat(healthCheat);

    // Start the loop
    await this.startCheatLoop();

    console.log('✅ Cheat loop started! Check the console for continuous updates.');
    console.log('💡 The loop will continuously apply the health cheat every 100ms.');
    console.log('🛑 Call memoryService.stopCheatLoop() to stop the loop.');
  }

  public isConnected(): boolean {
    return this.isAttached;
  }
}

// Export a singleton instance
export const memoryService = MemoryService.getInstance();
