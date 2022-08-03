import {MigrationInterface, QueryRunner} from "typeorm";

export class renamedAddressid1659509901097 implements MigrationInterface {
    name = 'renamedAddressid1659509901097'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "employee" DROP CONSTRAINT "FK_d48a7fffafbafa288f2969f0c63"`);
        await queryRunner.query(`ALTER TABLE "address" RENAME COLUMN "addressid" TO "id"`);
        await queryRunner.query(`ALTER TABLE "address" RENAME CONSTRAINT "PK_21b3699ce364e39fc5de084cd66" TO "PK_d92de1f82754668b5f5f5dd4fd5"`);
        await queryRunner.query(`ALTER TABLE "employee" RENAME COLUMN "address_addressid" TO "address_id"`);
        await queryRunner.query(`ALTER TABLE "employee" RENAME CONSTRAINT "UQ_d48a7fffafbafa288f2969f0c63" TO "UQ_2a4f5082f1be346e2b8cdec2194"`);
        await queryRunner.query(`ALTER TABLE "employee" ADD CONSTRAINT "FK_2a4f5082f1be346e2b8cdec2194" FOREIGN KEY ("address_id") REFERENCES "address"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "employee" DROP CONSTRAINT "FK_2a4f5082f1be346e2b8cdec2194"`);
        await queryRunner.query(`ALTER TABLE "employee" RENAME CONSTRAINT "UQ_2a4f5082f1be346e2b8cdec2194" TO "UQ_d48a7fffafbafa288f2969f0c63"`);
        await queryRunner.query(`ALTER TABLE "employee" RENAME COLUMN "address_id" TO "address_addressid"`);
        await queryRunner.query(`ALTER TABLE "address" RENAME CONSTRAINT "PK_d92de1f82754668b5f5f5dd4fd5" TO "PK_21b3699ce364e39fc5de084cd66"`);
        await queryRunner.query(`ALTER TABLE "address" RENAME COLUMN "id" TO "addressid"`);
        await queryRunner.query(`ALTER TABLE "employee" ADD CONSTRAINT "FK_d48a7fffafbafa288f2969f0c63" FOREIGN KEY ("address_addressid") REFERENCES "address"("addressid") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

}
