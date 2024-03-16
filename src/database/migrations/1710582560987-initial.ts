import { MigrationInterface, QueryRunner } from "typeorm";

export class Initial1710582560987 implements MigrationInterface {
    name = 'Initial1710582560987'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`DROP INDEX \`idx-users-ref_code\` ON \`users\``);
        await queryRunner.query(`ALTER TABLE \`users\` DROP COLUMN \`point\``);
        await queryRunner.query(`ALTER TABLE \`users\` DROP COLUMN \`ref_code\``);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`users\` ADD \`ref_code\` varchar(255) NOT NULL`);
        await queryRunner.query(`ALTER TABLE \`users\` ADD \`point\` int NOT NULL DEFAULT '0'`);
        await queryRunner.query(`CREATE UNIQUE INDEX \`idx-users-ref_code\` ON \`users\` (\`ref_code\`)`);
    }

}
