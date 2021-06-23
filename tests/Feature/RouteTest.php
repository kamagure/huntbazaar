<?php

namespace Tests\Feature;

use Illuminate\Foundation\Testing\RefreshDatabase;
use Illuminate\Foundation\Testing\WithFaker;
use Illuminate\Foundation\Testing\WithoutMiddleware;
use Tests\TestCase;

class RouteTest extends TestCase
{
    use WithoutMiddleware;
    /**
     * A basic feature test example.
     *
     * @return void
     */
    public function testExample()
    {
        $response = $this->call('GET', '/dashboard');
        $this->assertEquals(200, $response->status());
        $response = $this->call('GET', '/guest/list');
        $this->assertEquals(200, $response->status());
        $response = $this->call('GET', '/guest/add');
        $this->assertEquals(200, $response->status());
        $response = $this->call('POST', '/guest/invite');
        $this->assertEquals(404, $response->status());
        // $response = $this->call('DELETE', '/guest/delete/1');
        // $this->assertEquals(302, $response->status());
        $response = $this->call('PUT', '/change-time');
        $this->assertEquals(404, $response->status());
        $response = $this->call('GET', '/date');
        $this->assertEquals(404, $response->status());
        $response = $this->call('POST','/api/login');
        $this->assertEquals(404, $response->status());
        $response = $this->call('POST','/api/guest/invite');
        $this->assertEquals(302, $response->status());
    }
}
