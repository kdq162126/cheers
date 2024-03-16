import { MigrationInterface, QueryRunner } from "typeorm";

export class Initial1710602662394 implements MigrationInterface {
    name = 'Initial1710602662394'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`bids\` ADD \`proposal\` varchar(255) NULL`);
        await queryRunner.query(`ALTER TABLE \`users\` CHANGE \`role\` \`role\` varchar(255) NULL`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`users\` CHANGE \`role\` \`role\` varchar(255) NULL DEFAULT 'freelancer'`);
        await queryRunner.query(`ALTER TABLE \`bids\` DROP COLUMN \`proposal\``);
    }

}
