"use client";
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Users, ShieldCheck } from 'lucide-react';

interface User {
  id: number;
  firstName: string;
  lastName: string;
  email: string;
  role: string;
}

export default function UsersManagement() {
  const [users, setUsers] = useState<User[]>([]);
  const [loading, setLoading] = useState(