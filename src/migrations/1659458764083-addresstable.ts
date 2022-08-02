import {MigrationInterface, QueryRunner} from "typeorm";

export class addresstable1659458764083 implements MigrationInterface {
    name = 'addresstable1659458764083'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "address" ("created_at" TIMESTAMP NOT NULL DEFAULT now(), "updated_at" TIMESTAMP NOT NULL DEFAULT now(), "deleted_at" TIMESTAMP, "addressid" uuid NOT NULL DEFAULT uuid_generate_v4(), "line1" character varying NOT NULL, "line2" character varying NOT NULL, "city" character varying NOT NULL, "state" character varying NOT NULL, "pin" integer NOT NULL, CONSTRAINT "PK_21b3699ce364e39fc5de084cd66" PRIMARY KEY ("addressid"))`);
        await queryRunner.query(`ALTER TABLE "employee" ADD "addressid" character varying`);
        await queryRunner.query(`ALTER TABLE "employee" ADD "address_addressid" uuid`);
        await queryRunner.query(`ALTER TABLE "employee" ADD CONSTRAINT "UQ_d48a7fffafbafa288f2969f0c63" UNIQUE ("address_addressid")`);
        await queryRunner.query(`ALTER TABLE "employee" ADD CONSTRAINT "FK_d48a7fffafbafa288f2969f0c63" FOREIGN KEY ("address_addressid") REFERENCES "address"("addressid") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "employee" DROP CONSTRAINT "FK_d48a7fffafbafa288f2969f0c63"`);
        await queryRunner.query(`ALTER TABLE "employee" DROP CONSTRAINT "UQ_d48a7fffafbafa288f2969f0c63"`);
        await queryRunner.query(`ALTER TABLE "employee" DROP COLUMN "address_addressid"`);
        await queryRunner.query(`ALTER TABLE "employee" DROP COLUMN "addressid"`);
        await queryRunner.query(`DROP TABLE "address"`);
    }

}
