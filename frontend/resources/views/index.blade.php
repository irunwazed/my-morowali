<!DOCTYPE html>

<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width,initial-scale=1">
    <meta http-equiv="X-UA-Compatible" content="ie=edge">
    <title>Signin | Gull Admin Template</title>
    <link href="https://fonts.googleapis.com/css?family=Nunito:300,400,400i,600,700,800,900" rel="stylesheet">
    <link href="{{ asset('') }}/assets/dist-assets/css/themes/lite-purple.min.css" rel="stylesheet">
</head>
<div class="auth-layout-wrap"
    style="background-image: url({{ asset('') }}/assets/dist-assets/images/photo-wide-4.jpg)">
    <div class="auth-content">
        <div class="card o-hidden">
            <div class="row">
                <div class="col-md-6">
                    <div class="p-4">
                        <div class="auth-logo text-center mb-4"><img
                                src="{{ asset('') }}/assets/dist-assets/images/logo.png" alt=""></div>
                        <h1 class="mb-3 text-18">Sign In</h1>
                        <form id="form_login" action="{{ route('postlogin') }}" method="POST">
                            {{ csrf_field() }}
                            <div class="form-group">
                                <label for="username">Username</label>
                                <input class="form-control form-control-rounded" name="username" id="username"
                                    type="text">
                            </div>
                            <div class="form-group">
                                <label for="password">Password</label>
                                <input class="form-control form-control-rounded" name="password" id="password"
                                    type="password">
                            </div>
                            <button type="submit" id="btn_login"
                                class="btn btn-rounded btn-primary btn-block mt-2">Masuk</button>
                        </form>

                    </div>
                </div>
                <div class="col-md-6 text-center"
                    style="background-size: cover;background-image: url({{ asset('') }}/assets/dist-assets/images/photo-long-3.jpg)">
                    <div class="pr-3 auth-right"><a
                            class="btn btn-rounded btn-outline-primary btn-outline-email btn-block btn-icon-text"
                            href="signup.html"><i class="i-Mail-with-At-Sign"></i> Sign up with Email</a><a
                            class="btn btn-rounded btn-outline-google btn-block btn-icon-text"><i
                                class="i-Google-Plus"></i> Sign up with Google</a><a
                            class="btn btn-rounded btn-block btn-icon-text btn-outline-facebook"><i
                                class="i-Facebook-2"></i>
                        </a></div>
                </div>
            </div>
        </div>
    </div>
    {{ dd(session()->all()) }}
</div>

<script src="{{ asset('') }}/assets/dist-assets/js/plugins/jquery-3.3.1.min.js"></script>

<script src="{{ asset('') }}/assets/dist-assets/js/sweetalert2.all.min.js"></script>

@if ($message = Session::get('error'))
    <script>
        $(document).ready(function() {
            Swal.fire({
                icon: 'error',
                title: '{{ $message }}',
                text: '',
                customClass: {
                    confirmButton: 'btn btn-success'
                }
            });
        });
    </script>
@endif

@if ($message = Session::get('success'))
    <script>
        $(document).ready(function() {
            Swal.fire({
                icon: 'success',
                title: '{{ $message }}',
                text: '',
                customClass: {
                    confirmButton: 'btn btn-success'
                }
            });
        });
    </script>
@endif
