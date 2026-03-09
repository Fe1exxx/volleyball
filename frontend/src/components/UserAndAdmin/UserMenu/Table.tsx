import React, { useState, useMemo } from 'react';
import { 
  Calendar, Clock, MapPin, Users, Trophy, Dumbbell, 
  ChevronRight, Filter, Search, CheckCircle2, XCircle,
  TrendingUp, Activity, Award, User
} from 'lucide-react';

// Типы данных
interface Training {
  id: number;
  title: string;
  instructor: string;
  date: string;
  time: string;
  duration: number;
  maxParticipants: number;
  currentParticipants: number;
  location: string;
  type: 'group' | 'individual' | 'open';
  level: 'beginner' | 'intermediate' | 'advanced';
  price: number;
  isEnrolled: boolean;
}

interface Tournament {
  id: number;
  name: string;
  date: string;
  endDate: string;
  location: string;
  type: 'individual' | 'team' | 'mixed';
  category: string;
  prize: string;
  registrationDeadline: string;
  participantsCount: number;
  maxParticipants: number;
  entryFee: number;
  status: 'registration' | 'in_progress' | 'completed';
  userRegistered: boolean;
}

interface UserSubscription {
  type: string;
  remainingClasses: number;
  totalClasses: number;
  validUntil: string;
  isActive: boolean;
}

interface UserStats {
  totalTrainings: number;
  thisMonthTrainings: number;
  totalTournaments: number;
  currentStreak: number;
}

const UserDashboard: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'trainings' | 'tournaments' | 'my'>('trainings');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedLevel, setSelectedLevel] = useState<string>('all');
  const [selectedType, setSelectedType] = useState<string>('all');
  const [enrolledTrainings, setEnrolledTrainings] = useState<number[]>([1, 3]);
  const [registeredTournaments, setRegisteredTournaments] = useState<number[]>([2]);

  // Моковые данные
  const userSubscription: UserSubscription = {
    type: 'Месячный безлимит',
    remainingClasses: 12,
    totalClasses: 30,
    validUntil: '2025-03-31',
    isActive: true,
  };

  const userStats: UserStats = {
    totalTrainings: 45,
    thisMonthTrainings: 8,
    totalTournaments: 3,
    currentStreak: 5,
  };

  const trainings: Training[] = [
    {
      id: 1,
      title: 'Основы волейбола',
      instructor: 'Иванов И.И.',
      date: '2025-03-10',
      time: '18:00',
      duration: 90,
      maxParticipants: 15,
      currentParticipants: 12,
      location: 'Зал №1',
      type: 'group',
      level: 'beginner',
      price: 0,
      isEnrolled: true,
    },
    {
      id: 2,
      title: 'Продвинутая техника нападения',
      instructor: 'Петров П.П.',
      date: '2025-03-11',
      time: '19:00',
      duration: 120,
      maxParticipants: 10,
      currentParticipants: 8,
      location: 'Зал №2',
      type: 'group',
      level: 'advanced',
      price: 500,
      isEnrolled: false,
    },
    {
      id: 3,
      title: 'Индивидуальная тренировка',
      instructor: 'Сидорова А.А.',
      date: '2025-03-12',
      time: '10:00',
      duration: 60,
      maxParticipants: 1,
      currentParticipants: 0,
      location: 'Зал №1',
      type: 'individual',
      level: 'intermediate',
      price: 1500,
      isEnrolled: true,
    },
    {
      id: 4,
      title: 'Открытая тренировка',
      instructor: 'Команда тренеров',
      date: '2025-03-13',
      time: '17:00',
      duration: 90,
      maxParticipants: 20,
      currentParticipants: 15,
      location: 'Основной зал',
      type: 'open',
      level: 'beginner',
      price: 0,
      isEnrolled: false,
    },
    {
      id: 5,
      title: 'Тактика игры',
      instructor: 'Иванов И.И.',
      date: '2025-03-14',
      time: '18:30',
      duration: 90,
      maxParticipants: 12,
      currentParticipants: 10,
      location: 'Зал №3',
      type: 'group',
      level: 'intermediate',
      price: 0,
      isEnrolled: false,
    },
  ];

  const tournaments: Tournament[] = [
    {
      id: 1,
      name: 'Весенний кубок 2025',
      date: '2025-04-15',
      endDate: '2025-04-16',
      location: 'Спортивный комплекс "Олимпийский"',
      type: 'team',
      category: 'Микс',
      prize: '50 000 ₽',
      registrationDeadline: '2025-04-01',
      participantsCount: 12,
      maxParticipants: 16,
      entryFee: 5000,
      status: 'registration',
      userRegistered: false,
    },
    {
      id: 2,
      name: 'Личный чемпионат города',
      date: '2025-03-25',
      endDate: '2025-03-25',
      location: 'Зал №1',
      type: 'individual',
      category: 'Мужчины 18+',
      prize: '30 000 ₽',
      registrationDeadline: '2025-03-20',
      participantsCount: 24,
      maxParticipants: 32,
      entryFee: 1500,
      status: 'registration',
      userRegistered: true,
    },
    {
      id: 3,
      name: 'Турнир выходного дня',
      date: '2025-03-15',
      endDate: '2025-03-15',
      location: 'Зал №2',
      type: 'mixed',
      category: 'Любители',
      prize: 'Призы от спонсоров',
      registrationDeadline: '2025-03-13',
      participantsCount: 20,
      maxParticipants: 24,
      entryFee: 500,
      status: 'registration',
      userRegistered: false,
    },
    {
      id: 4,
      name: 'Новогодний турнир',
      date: '2024-12-28',
      endDate: '2024-12-28',
      location: 'Основной зал',
      type: 'team',
      category: 'Открытый',
      prize: '20 000 ₽',
      registrationDeadline: '2024-12-20',
      participantsCount: 8,
      maxParticipants: 8,
      entryFee: 3000,
      status: 'completed',
      userRegistered: false,
    },
  ];

  // Фильтрация тренировок
  const filteredTrainings = useMemo(() => {
    return trainings.filter(training => {
      const matchesSearch = training.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          training.instructor.toLowerCase().includes(searchQuery.toLowerCase());
      const matchesLevel = selectedLevel === 'all' || training.level === selectedLevel;
      const matchesType = selectedType === 'all' || training.type === selectedType;
      return matchesSearch && matchesLevel && matchesType;
    });
  }, [searchQuery, selectedLevel, selectedType]);

  // Обработчики
  const handleEnrollTraining = (trainingId: number) => {
    if (enrolledTrainings.includes(trainingId)) {
      setEnrolledTrainings(enrolledTrainings.filter(id => id !== trainingId));
    } else {
      setEnrolledTrainings([...enrolledTrainings, trainingId]);
    }
  };

  const handleRegisterTournament = (tournamentId: number) => {
    if (registeredTournaments.includes(tournamentId)) {
      setRegisteredTournaments(registeredTournaments.filter(id => id !== tournamentId));
    } else {
      setRegisteredTournaments([...registeredTournaments, tournamentId]);
    }
  };

  const getLevelColor = (level: string) => {
    const colors = {
      beginner: 'bg-green-100 text-green-800',
      intermediate: 'bg-yellow-100 text-yellow-800',
      advanced: 'bg-red-100 text-red-800',
    };
    return colors[level as keyof typeof colors] || 'bg-gray-100 text-gray-800';
  };

  const getTypeLabel = (type: string) => {
    const labels = {
      group: 'Групповая',
      individual: 'Индивидуальная',
      open: 'Открытая',
    };
    return labels[type as keyof typeof labels] || type;
  };

  const getTournamentTypeLabel = (type: string) => {
    const labels = {
      individual: 'Личный',
      team: 'Командный',
      mixed: 'Смешанный',
    };
    return labels[type as keyof typeof labels] || type;
  };

  const getStatusColor = (status: string) => {
    const colors = {
      registration: 'bg-blue-100 text-blue-800',
      in_progress: 'bg-yellow-100 text-yellow-800',
      completed: 'bg-gray-100 text-gray-800',
    };
    return colors[status as keyof typeof colors] || 'bg-gray-100 text-gray-800';
  };

  const getStatusLabel = (status: string) => {
    const labels = {
      registration: 'Регистрация',
      in_progress: 'Идет турнир',
      completed: 'Завершен',
    };
    return labels[status as keyof typeof labels] || status;
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('ru-RU', { day: 'numeric', month: 'long', year: 'numeric' });
  };

  const getDayOfWeek = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('ru-RU', { weekday: 'long' });
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-gradient-to-r from-blue-600 to-blue-800 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold">Личный кабинет</h1>
              <p className="text-blue-100 mt-1">Добро пожаловать, {userSubscription.isActive ? 'игрок' : 'гость'}!</p>
            </div>
            <div className="flex items-center gap-4">
              <div className="bg-white/10 backdrop-blur-sm rounded-lg px-4 py-2">
                <div className="text-sm text-blue-100">Осталось занятий</div>
                <div className="text-2xl font-bold">{userSubscription.remainingClasses}</div>
              </div>
            </div>
          </div>
        </div>
      </header>

      {/* Stats Cards */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 -mt-6">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-200">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Всего тренировок</p>
                <p className="text-2xl font-bold text-gray-900 mt-1">{userStats.totalTrainings}</p>
              </div>
              <div className="bg-blue-100 p-3 rounded-lg">
                <Activity className="w-6 h-6 text-blue-600" />
              </div>
            </div>
          </div>
          
          <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-200">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">В этом месяце</p>
                <p className="text-2xl font-bold text-gray-900 mt-1">{userStats.thisMonthTrainings}</p>
              </div>
              <div className="bg-green-100 p-3 rounded-lg">
                <TrendingUp className="w-6 h-6 text-green-600" />
              </div>
            </div>
          </div>

          <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-200">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Турниров сыграно</p>
                <p className="text-2xl font-bold text-gray-900 mt-1">{userStats.totalTournaments}</p>
              </div>
              <div className="bg-purple-100 p-3 rounded-lg">
                <Trophy className="w-6 h-6 text-purple-600" />
              </div>
            </div>
          </div>

          <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-200">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Текущая серия</p>
                <p className="text-2xl font-bold text-gray-900 mt-1">{userStats.currentStreak} дня</p>
              </div>
              <div className="bg-orange-100 p-3 rounded-lg">
                <Award className="w-6 h-6 text-orange-600" />
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Tabs */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 mb-6">
          <div className="border-b border-gray-200">
            <nav className="flex gap-4 sm:gap-8 px-4 overflow-x-auto scrollbar-hide pb-2">
              <button
                onClick={() => setActiveTab('trainings')}
                className={` whitespace-nowrap py-3 px-2 sm:px-4 border-b-2 font-medium text-sm transition-colors ${
                  activeTab === 'trainings'
                    ? 'border-blue-600 text-blue-600'
                    : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                }`}
              >
                <div className="flex items-center gap-2">
                  <Dumbbell className="w-5 h-5" />
                  Тренировки
                </div>
              </button>
              <button
                onClick={() => setActiveTab('tournaments')}
                className={`py-4 px-2 border-b-2 font-medium text-sm transition-colors ${
                  activeTab === 'tournaments'
                    ? 'border-blue-600 text-blue-600'
                    : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                }`}
              >
                <div className="flex items-center gap-2">
                  <Trophy className="w-5 h-5" />
                  Турниры
                </div>
              </button>
              <button
                onClick={() => setActiveTab('my')}
                className={`py-4 px-2 border-b-2 font-medium text-sm transition-colors ${
                  activeTab === 'my'
                    ? 'border-blue-600 text-blue-600'
                    : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                }`}
              >
                <div className="flex items-center gap-2">
                  <Calendar className="w-5 h-5" />
                  Мои записи
                </div>
              </button>
            </nav>
          </div>

          {/* Tab Content */}
          <div className="p-6">
            {/* Trainings Tab */}
            {activeTab === 'trainings' && (
              <div>
                {/* Filters */}
                <div className="flex flex-col sm:flex-row gap-4 mb-6">
                  <div className="relative flex-1">
                    <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                    <input
                      type="text"
                      placeholder="Поиск тренировки..."
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                      className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    />
                  </div>
                  <select
                    value={selectedLevel}
                    onChange={(e) => setSelectedLevel(e.target.value)}
                    className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  >
                    <option value="all">Все уровни</option>
                    <option value="beginner">Начинающий</option>
                    <option value="intermediate">Средний</option>
                    <option value="advanced">Продвинутый</option>
                  </select>
                  <select
                    value={selectedType}
                    onChange={(e) => setSelectedType(e.target.value)}
                    className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  >
                    <option value="all">Все типы</option>
                    <option value="group">Групповая</option>
                    <option value="individual">Индивидуальная</option>
                    <option value="open">Открытая</option>
                  </select>
                </div>

                {/* Trainings List */}
                <div className="space-y-4">
                  {filteredTrainings.map((training) => {
                    const isEnrolled = enrolledTrainings.includes(training.id);
                    const availableSpots = training.maxParticipants - training.currentParticipants + (isEnrolled ? 1 : 0);
                    
                    return (
                      <div
                        key={training.id}
                        className="border border-gray-200 rounded-xl p-6 hover:shadow-md transition-shadow bg-white"
                      >
                        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
                          <div className="flex-1">
                            <div className="flex items-start justify-between mb-2">
                              <h3 className="text-lg font-bold text-gray-900">{training.title}</h3>
                              <span className={`px-3 py-1 rounded-full text-xs font-medium ${getLevelColor(training.level)}`}>
                                {training.level === 'beginner' ? 'Начинающий' : training.level === 'intermediate' ? 'Средний' : 'Продвинутый'}
                              </span>
                            </div>
                            
                            <div className="grid grid-cols-2 md:grid-cols-3 gap-3 text-sm text-gray-600">
                              <div className="flex items-center gap-2">
                                <User className="w-4 h-4 text-gray-400" />
                                {training.instructor}
                              </div>
                              <div className="flex items-center gap-2">
                                <Calendar className="w-4 h-4 text-gray-400" />
                                {getDayOfWeek(training.date)}, {formatDate(training.date)}
                              </div>
                              <div className="flex items-center gap-2">
                                <Clock className="w-4 h-4 text-gray-400" />
                                {training.time} ({training.duration} мин)
                              </div>
                              <div className="flex items-center gap-2">
                                <MapPin className="w-4 h-4 text-gray-400" />
                                {training.location}
                              </div>
                              <div className="flex items-center gap-2">
                                <Users className="w-4 h-4 text-gray-400" />
                                {training.currentParticipants}/{training.maxParticipants} участников
                              </div>
                              <div className="flex items-center gap-2">
                                <span className="text-gray-400">Тип:</span>
                                {getTypeLabel(training.type)}
                              </div>
                            </div>
                          </div>

                          <div className="flex flex-col items-end gap-3">
                            <div className="text-right">
                              {training.price === 0 ? (
                                <span className="text-green-600 font-bold text-lg">Бесплатно</span>
                              ) : (
                                <span className="text-gray-900 font-bold text-lg">{training.price} ₽</span>
                              )}
                              {userSubscription.isActive && training.price === 0 && (
                                <p className="text-xs text-gray-500">По абонементу</p>
                              )}
                            </div>
                            
                            <button
                              onClick={() => handleEnrollTraining(training.id)}
                              disabled={availableSpots === 0 && !isEnrolled}
                              className={`px-6 py-2 rounded-lg font-medium transition-colors ${
                                isEnrolled
                                  ? 'bg-red-100 text-red-700 hover:bg-red-200'
                                  : availableSpots > 0
                                  ? 'bg-blue-600 text-white hover:bg-blue-700'
                                  : 'bg-gray-100 text-gray-400 cursor-not-allowed'
                              }`}
                            >
                              {isEnrolled ? 'Отмениться' : availableSpots > 0 ? 'Записаться' : 'Нет мест'}
                            </button>
                            
                            {availableSpots <= 3 && !isEnrolled && (
                              <span className="text-xs text-orange-600 font-medium">
                                Осталось мест: {availableSpots}
                              </span>
                            )}
                          </div>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            )}

            {/* Tournaments Tab */}
            {activeTab === 'tournaments' && (
              <div>
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                  {tournaments.map((tournament) => {
                    const isRegistered = registeredTournaments.includes(tournament.id);
                    const daysUntilDeadline = Math.ceil(
                      (new Date(tournament.registrationDeadline).getTime() - new Date().getTime()) / (1000 * 60 * 60 * 24)
                    );

                    return (
                      <div
                        key={tournament.id}
                        className={`border-2 rounded-xl p-6 transition-all ${
                          isRegistered ? 'border-blue-500 bg-blue-50' : 'border-gray-200 bg-white hover:shadow-md'
                        }`}
                      >
                        <div className="flex items-start justify-between mb-4">
                          <div>
                            <h3 className="text-xl font-bold text-gray-900 mb-1">{tournament.name}</h3>
                            <span className={`inline-block px-3 py-1 rounded-full text-xs font-medium ${getStatusColor(tournament.status)}`}>
                              {getStatusLabel(tournament.status)}
                            </span>
                          </div>
                          {isRegistered && (
                            <CheckCircle2 className="w-6 h-6 text-blue-600" />
                          )}
                        </div>

                        <div className="space-y-3 mb-4">
                          <div className="flex items-center gap-2 text-sm text-gray-600">
                            <Calendar className="w-4 h-4 text-gray-400" />
                            {formatDate(tournament.date)}
                            {tournament.date !== tournament.endDate && ` - ${formatDate(tournament.endDate)}`}
                          </div>
                          <div className="flex items-center gap-2 text-sm text-gray-600">
                            <MapPin className="w-4 h-4 text-gray-400" />
                            {tournament.location}
                          </div>
                          <div className="flex items-center gap-4 text-sm text-gray-600">
                            <span className="flex items-center gap-1">
                              <Users className="w-4 h-4 text-gray-400" />
                              {getTournamentTypeLabel(tournament.type)}
                            </span>
                            <span>{tournament.category}</span>
                          </div>
                          <div className="flex items-center gap-2 text-sm">
                            <Trophy className="w-4 h-4 text-yellow-600" />
                            <span className="font-medium text-gray-900">Приз: {tournament.prize}</span>
                          </div>
                        </div>

                        <div className="border-t border-gray-200 pt-4 mb-4">
                          <div className="flex items-center justify-between text-sm mb-2">
                            <span className="text-gray-600">Участников:</span>
                            <span className="font-medium">{tournament.participantsCount}/{tournament.maxParticipants}</span>
                          </div>
                          <div className="w-full bg-gray-200 rounded-full h-2">
                            <div
                              className="bg-blue-600 h-2 rounded-full transition-all"
                              style={{ width: `${(tournament.participantsCount / tournament.maxParticipants) * 100}%` }}
                            />
                          </div>
                        </div>

                        <div className="flex items-center justify-between">
                          <div>
                            <div className="text-lg font-bold text-gray-900">{tournament.entryFee} ₽</div>
                            {daysUntilDeadline > 0 && tournament.status === 'registration' && (
                              <div className={`text-xs ${daysUntilDeadline <= 3 ? 'text-red-600 font-medium' : 'text-gray-500'}`}>
                                Регистрация до {formatDate(tournament.registrationDeadline)}
                              </div>
                            )}
                          </div>
                          
                          {tournament.status === 'registration' && (
                            <button
                              onClick={() => handleRegisterTournament(tournament.id)}
                              className={`px-6 py-2 rounded-lg font-medium transition-colors ${
                                isRegistered
                                  ? 'bg-red-100 text-red-700 hover:bg-red-200'
                                  : 'bg-blue-600 text-white hover:bg-blue-700'
                              }`}
                            >
                              {isRegistered ? 'Отменить регистрацию' : 'Зарегистрироваться'}
                            </button>
                          )}
                          
                          {tournament.status === 'in_progress' && (
                            <span className="px-4 py-2 bg-yellow-100 text-yellow-800 rounded-lg font-medium">
                              Идет турнир
                            </span>
                          )}
                          
                          {tournament.status === 'completed' && (
                            <span className="px-4 py-2 bg-gray-100 text-gray-600 rounded-lg font-medium">
                              Завершен
                            </span>
                          )}
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            )}

            {/* My Records Tab */}
            {activeTab === 'my' && (
              <div className="space-y-6">
                {/* Subscription Info */}
                <div className="bg-gradient-to-r from-blue-500 to-blue-600 rounded-xl p-6 text-white">
                  <h3 className="text-xl font-bold mb-4">Ваш абонемент</h3>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div>
                      <div className="text-blue-100 text-sm">Тип</div>
                      <div className="text-lg font-semibold">{userSubscription.type}</div>
                    </div>
                    <div>
                      <div className="text-blue-100 text-sm">Осталось занятий</div>
                      <div className="text-3xl font-bold">{userSubscription.remainingClasses} <span className="text-lg font-normal text-blue-100">из {userSubscription.totalClasses}</span></div>
                    </div>
                    <div>
                      <div className="text-blue-100 text-sm">Действителен до</div>
                      <div className="text-lg font-semibold">{formatDate(userSubscription.validUntil)}</div>
                    </div>
                  </div>
                  <div className="mt-4">
                    <div className="w-full bg-blue-800 rounded-full h-3">
                      <div
                        className="bg-white h-3 rounded-full transition-all"
                        style={{ width: `${(userSubscription.remainingClasses / userSubscription.totalClasses) * 100}%` }}
                      />
                    </div>
                  </div>
                </div>

                {/* My Trainings */}
                <div>
                  <h3 className="text-lg font-bold text-gray-900 mb-4">Мои тренировки</h3>
                  <div className="space-y-3">
                    {trainings
                      .filter(t => enrolledTrainings.includes(t.id))
                      .map((training) => (
                        <div key={training.id} className="bg-white border border-gray-200 rounded-xl p-4 flex items-center justify-between">
                          <div>
                            <h4 className="font-semibold text-gray-900">{training.title}</h4>
                            <div className="flex items-center gap-4 text-sm text-gray-600 mt-1">
                              <span className="flex items-center gap-1">
                                <Calendar className="w-4 h-4" />
                                {formatDate(training.date)}
                              </span>
                              <span className="flex items-center gap-1">
                                <Clock className="w-4 h-4" />
                                {training.time}
                              </span>
                              <span className="flex items-center gap-1">
                                <MapPin className="w-4 h-4" />
                                {training.location}
                              </span>
                            </div>
                          </div>
                          <button
                            onClick={() => handleEnrollTraining(training.id)}
                            className="px-4 py-2 text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                          >
                            Отмениться
                          </button>
                        </div>
                      ))}
                    {enrolledTrainings.length === 0 && (
                      <div className="text-center py-8 text-gray-500">
                        <Calendar className="w-12 h-12 mx-auto mb-2 text-gray-300" />
                        <p>У вас пока нет записанных тренировок</p>
                        <button
                          onClick={() => setActiveTab('trainings')}
                          className="mt-2 text-blue-600 hover:underline"
                        >
                          Записаться на тренировку
                        </button>
                      </div>
                    )}
                  </div>
                </div>

                {/* My Tournaments */}
                <div>
                  <h3 className="text-lg font-bold text-gray-900 mb-4">Мои турниры</h3>
                  <div className="space-y-3">
                    {tournaments
                      .filter(t => registeredTournaments.includes(t.id))
                      .map((tournament) => (
                        <div key={tournament.id} className="bg-white border border-gray-200 rounded-xl p-4">
                          <div className="flex items-start justify-between">
                            <div>
                              <h4 className="font-semibold text-gray-900">{tournament.name}</h4>
                              <div className="flex items-center gap-4 text-sm text-gray-600 mt-1">
                                <span className="flex items-center gap-1">
                                  <Calendar className="w-4 h-4" />
                                  {formatDate(tournament.date)}
                                </span>
                                <span className="flex items-center gap-1">
                                  <MapPin className="w-4 h-4" />
                                  {tournament.location}
                                </span>
                              </div>
                            </div>
                            <button
                              onClick={() => handleRegisterTournament(tournament.id)}
                              className="px-4 py-2 text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                            >
                              Отменить регистрацию
                            </button>
                          </div>
                        </div>
                      ))}
                    {registeredTournaments.length === 0 && (
                      <div className="text-center py-8 text-gray-500">
                        <Trophy className="w-12 h-12 mx-auto mb-2 text-gray-300" />
                        <p>Вы пока не зарегистрированы на турниры</p>
                        <button
                          onClick={() => setActiveTab('tournaments')}
                          className="mt-2 text-blue-600 hover:underline"
                        >
                          Посмотреть турниры
                        </button>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </main>
    </div>
  );
};

export default UserDashboard;