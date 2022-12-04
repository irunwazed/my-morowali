<?php

namespace App\Http\Middleware;

use Closure;

class CheckUserSession
{

    public function handle($request, Closure $next)
    {
        if (!$request->session()->exists('token')) {
            return redirect('/');
        }

        return $next($request);
    }

}
