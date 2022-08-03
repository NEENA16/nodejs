import {MigrationInterface, QueryRunner} from "typeorm";

export class adressTableModified1659511755597 implements MigrationInterface {
    name = 'adressTableModified1659511755597'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "employee" DROP COLUMN "addressid"`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "employee" ADD "addressid" character varying`);
    }

}
