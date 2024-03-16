import { MigrationInterface, QueryRunner } from "typeorm";

export class Initial1710582195147 implements MigrationInterface {
    name = 'Initial1710582195147'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`jobs\` DROP FOREIGN KEY \`fk-jobs-user_id\``);
        await queryRunner.query(`ALTER TABLE \`jobs\` CHANGE \`user_id\` \`owner_id\` int NULL`);
        await queryRunner.query(`ALTER TABLE \`jobs\` ADD CONSTRAINT \`fk-jobs-owner_id\` FOREIGN KEY (\`owner_id\`) REFERENCES \`users\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`jobs\` DROP FOREIGN KEY \`fk-jobs-owner_id\``);
        await queryRunner.query(`ALTER TABLE \`jobs\` CHANGE \`owner_id\` \`user_id\` int NULL`);
        await queryRunner.query(`ALTER TABLE \`jobs\` ADD CONSTRAINT \`fk-jobs-user_id\` FOREIGN KEY (\`user_id\`) REFERENCES \`users\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

}
