import { UseGuards } from '@nestjs/common';
import { Args, Int, Mutation, Query, Resolver } from '@nestjs/graphql';
import { AuthGuard } from '@nestjs/passport';
import { AdminAuthGuard } from 'src/auth/admin-auth.guard';
import { AuthService } from 'src/auth/auth.service';
import { AuthAdmin } from 'src/common/decorator/auth-admin.decorator';
import { AdminService } from './admin.service';
import { CreateAdminInput } from './dto/create-admin.input';
import { LoginAdminInput } from './dto/login-admin.input';
import { LoginAdminOutput } from './dto/login-admin.output';
import { UpdateAdminInput } from './dto/update-admin.input';
import { Admin } from './entities/admin.entity';

@Resolver(() => Admin)
export class AdminResolver {
  constructor(
    private readonly adminService: AdminService,
    private readonly authService: AuthService,
  ) {}

  @Mutation(() => Admin)
  createAdmin(@Args('createAdminInput') createAdminInput: CreateAdminInput) {
    return this.adminService.create(createAdminInput);
  }

  @Query(() => [Admin], { name: 'admin' })
  findAll() {
    return this.adminService.findAll();
  }

  @Query(() => Admin, { name: 'admin' })
  findOne(@Args('id', { type: () => Int }) id: number) {
    return this.adminService.findOne({ id });
  }

  @Mutation(() => Admin)
  updateAdmin(@Args('updateAdminInput') updateAdminInput: UpdateAdminInput) {
    return this.adminService.update(updateAdminInput.id, updateAdminInput);
  }

  @Mutation(() => Admin)
  removeAdmin(@Args('id', { type: () => Int }) id: number) {
    return this.adminService.remove(id);
  }

  @UseGuards(AdminAuthGuard)
  // @UseGuards(AuthGuard('local'))
  @Query(() => LoginAdminOutput)
  login(
    @Args('username') username: string,
    @Args('password') password: string,
    @AuthAdmin() admin: Admin,
  ) {
    return this.authService.login(admin);
  }
}
