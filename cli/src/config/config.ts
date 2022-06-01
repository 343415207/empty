/*
{
    "candy_machine_address": "D7vPBJ7T8nWtpkd32ViM27qqnGSuW7th6hSGtsnQF7gZ",
    "count_of_token": 2,
    "count_of_process_per_token": 10,
    "server_endpoint": "api.devnet.solana.com"
  }
 */
export interface IMintConfig {
    candy_machine_address:string;
    count_of_token: number;
    count_of_process_per_token: number;
    server_endpoint: string;
}
