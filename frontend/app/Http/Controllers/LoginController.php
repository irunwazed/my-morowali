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
                env('API_URL') . '/auth/login',
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
                env('API_URL') . '/auth/cek-login',
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
            dd($request->session()->all());
        } catch (RequestException $e) {
            $response = $e->getResponse();
            $responseBodyAsString = json_decode($response->getBody()->getContents());
            return \redirect()->back()->with('error', $responseBodyAsString->message);
            // dd(json_decode($responseBodyAsString));
        }
    }

    public function logout(Request $request)
    {
        $request->session()->flush();

        return \redirect(route('login'))->with('success', 'Anda berhasil logout!');
    }

}
