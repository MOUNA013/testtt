<form id="register" action="/Register" method="POST" tabindex="500">
    @csrf
    <div class="name mb-3">
        <div class="form-row">
            <div class="col-md-6">
                <input type="text" placeholder="{{__('first_name')}}" class="form-control "  style="border-color: #F07F19; background-color: #FFFDFD;" id="Nom" name="firstname" required>
            </div>
            <div class="col-md-6">
                <input type="text" placeholder="{{__('last-name')}}" class="form-control "  style="border-color: #F07F19; background-color: #FFFDFD;" id="Prenom" name="lastname" required>
            </div>
        </div>
    </div>
    <div class="mail mb-3">
        <input type="email" class="form-control " placeholder="{{__('email')}}"  style="border-color: #F07F19; background-color: #FFFDFD;"  id="ins_email" name="email" required>
    </div>
    
    <div class="mail mb-3">
        <div class="form-row">
            <div class="col-md-6">
                <input type="password" placeholder="{{__('enter_pass')}}" class="form-control "  style="border-color: #F07F19; background-color: #FFFDFD;" name="password1" id="password1" required>
            </div>
            <div class="col-md-6">
                <input type="password" placeholder="{{__('confirm_pass')}}" class="form-control "  style="border-color: #F07F19; background-color: #FFFDFD;" name="password2" id="password2" required>
            </div>
        </div>
        <div class="form-row" style="color: rgb(206, 14, 14); display: none;" id="regex">
            <div class="col-12">
                {{__('pass_regex')}}
            </div>
        </div>
    </div>
    <div class="passwd mb-3">
        <div class="input-group telephone-input">
            <input id="phone" type="tel"  class="form-control"  placeholder="e.g. 0612345678">
            <input name="phone" type="hidden" id="phonenumber" >
            
        </div>
    </div>
    <div class="mail mb-3">
        <div class="form-row">
            <div class="col-md-6">
                <div class="checkbox checkbox-info">
                    <label class="custom-control mt-4 form-checkbox">
                        <input type="checkbox" onclick="SetCoupon()" id="checkcoupon"  class="custom-control-input" checked />
                        <span class="custom-control-label text-dark ps-2">{{__('use_partner_code')}}</span>
                    </label>
                </div>
            </div>
            <div class="col-md-6" id="coupondiv">
                <input type="text" placeholder="{{__('COUPON')}}" class="form-control "  style="border-color: #F07F19; background-color: #FFFDFD;" name="coupon" id="coupon" >
            </div>
        </div>
        <div class="form-row" style="color: rgb(206, 14, 14); display: none;" id="couponalert">
            <div class="col-12">
                {{__('partner_code_invalid')}}
            </div>
        </div>
    </div>
    <div class="submit mb-3">
        <a class="btn btn-primary text-white btn-block" onclick="Register()">{{__('register')}}</a>
        <button class="btn btn-primary btn-block" type="submit" id="submit" style="display: none;">Register</button>
    </div>
    {{ $slot }}
</form>