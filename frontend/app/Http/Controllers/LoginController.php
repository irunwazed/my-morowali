<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Auth;
use Session;
use GuzzleHttp\Exception\RequestException;

class LoginController extends Controller
{
    public function login(Request $request)
    {
        try {
            $client = new \GuzzleHttp\Client();
            $response = $client->request(
                'POST',
                'http://127.0.0.1:3000/auth/login',
                [
                    'form_params' => [
                        'username' => $request->username,
                        'password' => $request->password,
                    ]
                ]
            );
            $respon = json_decode($response->getBody()->getContents());

            $client2 = new \GuzzleHttp\Client();
            $response2 = $client2->request(
                'get',
                'http://127.0.0.1:3000/auth/cek-login',
                [
                    'headers' =>
                    [
                        'Authorization' => "Bearer $respon->token"
                    ]
                ]
            );
            $respon2 = json_decode($response2->getBody()->getContents());
            $token = $respon->token;
            $session = $respon2->session;

            Session::put('token', $token);
            Session::put('session_data', $session);
            Session::save();
            $data = $request->session()->all();
            // dd($data['session_data']->akun);

            if ($data['session_data']->level == 2) {
                return \redirect(route('admin.index'))->with('success', 'Login Success, <br> Selamat datang ' . $data['session_data']->username . '!');
            } else {
                $request->session()->forget('token');
                $request->session()->forget('session_data');
                return \redirect(route('login'))->with('error', 'Err Login!');
            }
        } catch (RequestException $e) {
            $response = $e->getResponse();
            $responseBodyAsString = json_decode($response->getBody()->getContents());
            dd($responseBodyAsString);
            return \redirect()->back()->with('error', $responseBodyAsString->message);
            // dd(json_decode($responseBodyAsString));
        }
    }

    public function logout(Request $request)
    {
        $request->session()->forget('token');
        $request->session()->forget('session_data');
        $request->session()->flush();

        return \redirect(route('login'))->with('success', 'Anda berhasil logout!');
    }
}
