import { MigrationInterface, QueryRunner } from "typeorm";

export class Initial1710581589015 implements MigrationInterface {
    name = 'Initial1710581589015'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE \`user_signatures\` (\`id\` int NOT NULL AUTO_INCREMENT, \`created_at\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), \`updated_at\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6), \`deleted_at\` datetime(6) NULL, \`user_id\` int NOT NULL, \`nonce\` varchar(255) NOT NULL, \`message\` text NOT NULL, \`signature\` varchar(255) NOT NULL, \`expiration_time\` datetime NOT NULL, UNIQUE INDEX \`idx-user_signatures-nonce\` (\`nonce\`), PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`CREATE TABLE \`users\` (\`id\` int NOT NULL AUTO_INCREMENT, \`created_at\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), \`updated_at\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6), \`deleted_at\` datetime(6) NULL, \`name\` varchar(255) NULL, \`avatar\` varchar(255) NULL, \`wallet_address\` varchar(255) NULL, \`email\` varchar(255) NULL, \`role\` varchar(255) NULL DEFAULT 'freelancer', \`point\` int NOT NULL DEFAULT '0', \`ref_code\` varchar(255) NOT NULL, UNIQUE INDEX \`idx-users-ref_code\` (\`ref_code\`), PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`CREATE TABLE \`bids\` (\`id\` int NOT NULL AUTO_INCREMENT, \`created_at\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), \`updated_at\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6), \`deleted_at\` datetime(6) NULL, \`status\` varchar(255) NULL, \`user_id\` int NULL, \`job_id\` int NULL, PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`CREATE TABLE \`jobs\` (\`id\` int NOT NULL AUTO_INCREMENT, \`created_at\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), \`updated_at\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6), \`deleted_at\` datetime(6) NULL, \`name\` varchar(255) NULL, \`description\` varchar(255) NULL, \`image_url\` varchar(255) NULL, \`price\` int NULL, \`status\` varchar(255) NULL, \`user_id\` int NULL, PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`ALTER TABLE \`user_signatures\` ADD CONSTRAINT \`fk-user_signatures-user_id\` FOREIGN KEY (\`user_id\`) REFERENCES \`users\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`bids\` ADD CONSTRAINT \`fk-bids-user_id\` FOREIGN KEY (\`user_id\`) REFERENCES \`users\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`bids\` ADD CONSTRAINT \`fk-bids-job_id\` FOREIGN KEY (\`job_id\`) REFERENCES \`jobs\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`jobs\` ADD CONSTRAINT \`fk-jobs-user_id\` FOREIGN KEY (\`user_id\`) REFERENCES \`users\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`jobs\` DROP FOREIGN KEY \`fk-jobs-user_id\``);
        await queryRunner.query(`ALTER TABLE \`bids\` DROP FOREIGN KEY \`fk-bids-job_id\``);
        await queryRunner.query(`ALTER TABLE \`bids\` DROP FOREIGN KEY \`fk-bids-user_id\``);
        await queryRunner.query(`ALTER TABLE \`user_signatures\` DROP FOREIGN KEY \`fk-user_signatures-user_id\``);
        await queryRunner.query(`DROP TABLE \`jobs\``);
        await queryRunner.query(`DROP TABLE \`bids\``);
        await queryRunner.query(`DROP INDEX \`idx-users-ref_code\` ON \`users\``);
        await queryRunner.query(`DROP TABLE \`users\``);
        await queryRunner.query(`DROP INDEX \`idx-user_signatures-nonce\` ON \`user_signatures\``);
        await queryRunner.query(`DROP TABLE \`user_signatures\``);
    }

}
