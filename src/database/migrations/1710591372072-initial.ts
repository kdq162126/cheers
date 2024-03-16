import { MigrationInterface, QueryRunner } from "typeorm";

export class Initial1710591372072 implements MigrationInterface {
    name = 'Initial1710591372072'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`DROP INDEX \`idx-user_signatures-nonce\` ON \`user_signatures\``);
        await queryRunner.query(`ALTER TABLE \`user_signatures\` CHANGE \`nonce\` \`nonce\` varchar(255) NULL`);
        await queryRunner.query(`ALTER TABLE \`user_signatures\` CHANGE \`expiration_time\` \`expiration_time\` datetime NULL`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`user_signatures\` CHANGE \`expiration_time\` \`expiration_time\` datetime NOT NULL`);
        await queryRunner.query(`ALTER TABLE \`user_signatures\` CHANGE \`nonce\` \`nonce\` varchar(255) NOT NULL`);
        await queryRunner.query(`CREATE UNIQUE INDEX \`idx-user_signatures-nonce\` ON \`user_signatures\` (\`nonce\`)`);
    }

}
