<?php

namespace App\Http\Middleware;

use Session;
use Closure;

class CekLevel
{
    /**
     * Handle an incoming request.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  \Closure  $next
     * @return mixed
     */
    public function handle($request, Closure $next, ...$levels)
    {
        $datses = $request->session()->get('session_data');
        // dd($datses->level);
        if (in_array($datses->level, $levels)) {
            return $next($request);
        }
        return \redirect(route('login'))->with('error', 'Silakan login terlebih dahulu!');
    }
}
