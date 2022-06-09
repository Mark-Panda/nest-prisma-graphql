import { Module } from '@nestjs/common';
import { OrganizeModule } from './organize/organize.module';
import { PersonModule } from './person/person.module';
import { UserModule } from './user/user.module';
import { UserGroupModule } from './user-group/user-group.module';
import { ModuleModule } from './module/module.module';
import { MenuModule } from './menu/menu.module';
import { ActionGroupModule } from './action-group/action-group.module';
import { ActionModule } from './action/action.module';
import { ActionBasisModule } from './action-basis/action-basis.module';
import { PermissionModule } from './permission/permission.module';
import { PermissionGroupModule } from './permission-group/permission-group.module';
import { SignatureRuleModule } from './signature-rule/signature-rule.module';
import { SignaturePermissionModule } from './signature-permission/signature-permission.module';
import { SignatureGroupModule } from './signature-group/signature-group.module';
import { SignatureMethodModule } from './signature-method/signature-method.module';
@Module({
    imports: [
        OrganizeModule,
        PersonModule,
        UserModule,
        UserGroupModule,
        ModuleModule,
        MenuModule,
        ActionGroupModule,
        ActionModule,
        ActionBasisModule,
        PermissionModule,
        PermissionGroupModule,
        SignatureRuleModule,
        SignaturePermissionModule,
        SignatureGroupModule,
        SignatureMethodModule,
    ],
})
export class AllModules {}
