import { Component, OnInit } from '@angular/core';
import { DValidateRules, FormLayout } from 'ng-devui/form';
import { of } from 'rxjs';
import { delay, map } from 'rxjs/operators';
@Component({
  selector: 'app-login-form',
  templateUrl: './login-form.component.html',
  styleUrls: ['./login-form.component.scss'],
})
export class LoginFormComponent implements OnInit {
  constructor() {}

  ngOnInit(): void {}

  layoutDirection: FormLayout = FormLayout.Vertical;
  msgs: Array<Object> = [];

  existUsernames = ['123', '123456', 'DevUI'];

  formData: { userName: any; password: any } = {
    userName: '',
    password: '',
  };

  formRules: {
    rule: DValidateRules;
    usernameRules: DValidateRules;
    passwordRules: DValidateRules;
  } = {
    rule: {
      message: 'The form verification failed, please check.',
      messageShowType: 'text',
    },
    usernameRules: {
      validators: [
        { required: true },
        { minlength: 3 },
        { maxlength: 128 },
        {
          pattern: /^[a-zA-Z0-9]+(\s+[a-zA-Z0-9]+)*$/,
          message: {
            'zh-cn': '仅允许输入数字与大小写字母',
            'en-us':
              'The user name cannot contain characters except uppercase and lowercase letters.',
          },
        },
      ],
      asyncValidators: [
        {
          sameName: this.checkName.bind(this),
          message: '用户名不存在！',
        },
      ],
    },
    passwordRules: {
      validators: [
        { required: true },
        { minlength: 6 },
        { maxlength: 15 },
        { pattern: /^[a-zA-Z0-9]+(\s+[a-zA-Z0-9]+)*$/ },
      ],
      message: 'Enter a password that contains 6 to 15 digits and letters.',
    },
  };

  maxUsers(num: any) {
    return (val: any) => {
      return !val || val.length <= num;
    };
  }
  submitForm({ valid, directive }: any) {
    console.log(directive);
    // do something for submitting
    if (valid) {
      console.log(this.formData);
      of(this.formData)
        .pipe(
          map((val) => 'success'),
          delay(500)
        )
        .subscribe((res) => {
          if (res === 'success') {
            this.showToast('success', '成功', '登录成功！');
          }
        });
    } else {
      this.showToast('error', '失败', '登录失败！');
    }
  }

  checkName(value: any) {
    let res = true;
    if (this.existUsernames.indexOf(value) !== -1) {
      res = false;
    }
    return of(res).pipe(delay(500));
  }

  showToast(type: any, title: string, msg: string) {
    this.msgs = [{ severity: type, summary: title, detail: msg }];
  }
}
