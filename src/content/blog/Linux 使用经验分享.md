---
title: "Linux 使用经验分享"
description: "关于 Linux 的使用心得"
pubDate: "Sep 3 2026"
heroImage: "../../assets/将军请下命令吧.png"
tags: ["Linux", "操作系统"]
---

本文面向具有基本计算机知识但缺乏 Linux 实践经验的读者。我们将从 Linux 的核心概念入手，深入讲解其操作原理，涵盖主流发行版的安装与使用，帮助你快速掌握任何 Linux 发行版。

## Linux 的定义

---

### 什么是 Linux ？

严格来说，**Linux 是一个类 Unix 操作系统内核**，由 Linus Torvalds 在 1991 年首次发布。Linux 内核是完全开源的，任何人都可以自由使用、修改和分发。当 Linux 内核与 GNU 工具链相结合时，才能形成一个功能完整的操作系统——这就是我们通常所说的 GNU/Linux 系统。

> * 维基百科条目 [Linux](https://en.wikipedia.org/wiki/Linux/)
> * [Linux 官方代码仓库](https://www.kernel.org/)

### 什么是 GNU/Linux ？

GNU 是由 Richard Stallman 于 1983 年发起的自由软件项目。该项目的目标是建立一个完全由自由软件组成的、类似 Unix 的操作系统。为此，GNU 项目开发了许多基础软件：

* GCC：C/C++ 编译器
* GNU Coreutils：ls、cp、mv、rm 等基础命令
* Bash：Shell
* GNU Binutils：ld、as 等工具
* GDB：调试器
* glibc：GNU C Library

Linux 仅是一个内核，完整的类 Unix 操作系统还需要大量用户空间软件。Linux 内核与 GNU 工具链的结合，形成了功能完整的操作系统，即我们常说的 GNU/Linux 系统。

```asciidoc
┌────────────────────────────┐
│        Applications        │
│ Firefox / Vim / Python ... │
├────────────────────────────┤
│       User Space           │
│                            │
│ Bash / Coreutils / GCC ... │ ← GNU
├────────────────────────────┤
│       Linux Kernel         │ ← Linux
├────────────────────────────┤
│          Hardware          │
└────────────────────────────┘
```

Linux 并不一定要与 GNU 工具链结合，如 Android 就使用了独立的工具链；同样，GNU 工具也不必与 Linux 结合，如 GNU Hurd 就是一个独立的类 Unix 微内核。

> * 维基百科条目 [GNU](https://zh.wikipedia.org/wiki/GNU/)
> * 维基百科条目 [GNU/Linux 命名争议](https://zh.wikipedia.org/wiki/GNU/Linux%E5%91%BD%E5%90%8D%E7%88%AD%E8%AD%B0/)
> * GNU 官方网站 [GNU](https://www.gnu.org/)

### 什么是 Unix-like 系统？

类 Unix 系统（Unix-like system）是指在设计理念和行为上与 Unix 相似的操作系统。这些系统通常遵循 POSIX 标准，并提供类似的命令行界面和文件系统结构。Linux 是最著名的类 Unix 系统，但还有许多其他选择，如 FreeBSD、OpenBSD、NetBSD、macOS 等。只有符合 POSIX 单一 UNIX 规范的操作系统才能被正式称为 Unix 系统。

我们常说的 Linux 常用命令（如 `ls`、`cp`、`mv`、`rm` 等）实际上是由 POSIX 规范定义的标准命令。在 GNU/Linux 中由 GNU Coreutils 提供这些命令的实现；在 Android 中由 BusyBox 提供；在 FreeBSD 等其他类 Unix 系统中也有类似实现，只是具体的实现方式可能有所不同。

> 概念澄清：在 Linux 中，**程序（Program）** 是文件系统中实际存在的可执行文件或脚本；**命令（Command）** 是用户在 Shell 中输入的、用来通知系统执行某操作的指令。例如执行 `ls` 时，`ls` 程序通常位于 `/usr/bin/ls`，而你在终端输入的 `ls` 则是一个命令。
>
> * 维基百科条目 [类 Unix 系统](https://zh.wikipedia.org/wiki/%E7%B1%BBUnix%E7%B3%BB%E7%BB%9F/)
> * 维基百科条目 [可移植操作系统接口](https://zh.wikipedia.org/wiki/%E5%8F%AF%E7%A7%BB%E6%A4%8D%E6%93%8D%E4%BD%9C%E7%B3%BB%E7%BB%9F%E6%8E%A5%E5%8F%A3/)
> * 维基百科条目 [Linux 实用程序列表](https://zh.wikipedia.org/wiki/Unix%E5%AE%9E%E7%94%A8%E7%A8%8B%E5%BA%8F%E5%88%97%E8%A1%A8/)

### 什么是 Linux 发行版？

一般来说，**Linux 发行版**是将 Linux 内核与各种软件包（包括 GNU 工具链、桌面环境、应用程序等）组织打包在一起，形成完整操作系统的集合。每个发行版都有独特的特点、目标用户群体和软件管理方式。典型的发行版组成层次如下：

```asciidoc
Linux Kernel
      ↓
系统工具 / GNU
      ↓
C Library
      ↓
Init / Service Manager
      ↓
Package Manager
      ↓
Desktop Environment
      ↓
Distribution
```

各层级的具体实现不同，造就了各具特色的 Linux 发行版。Arch Linux 和 NixOS 等发行版允许用户在安装时自行选择所有组件。不同的发行版往往在核心概念上是相通的，比如在某个发行版上遇到的问题，往往可以在 Arch Wiki 中找到通用的解决方案。

一般来说，Linux 发行版根据软件包格式、包管理器和软件仓库体系分类：

* **Debian 系**：Ubuntu、Debian、Linux Mint 等
* **Red Hat 系**：RHEL、Fedora、CentOS 等

> * 维基百科条目 [Linux 发行版](https://zh.wikipedia.org/wiki/Linux%E5%8F%91%E8%A1%8C%E7%89%88/)
> * [Arch Wiki](https://wiki.archlinux.org/title/Main_page/)

### Linux Kernel 与 Windows NT 的区别

已知操作系统承担以下功能：

```asciidoc
进程管理
内存管理
文件系统
设备驱动
网络
权限与安全
系统调用
```

在实现这些功能时，**Linux Kernel** 采用**宏内核**设计：大部分功能在内核空间实现，内核功能扩展依赖内核模块或 eBPF 等机制，各模块共享同一地址空间。而 **Windows NT** 采用**混合内核**设计：仅部分功能在内核空间实现，内核功能扩展依赖驱动程序。

最直观的区别是，Windows NT 将图形界面实现在内核空间中，而 Linux Kernel 仅提供字符界面，图形界面由用户空间的 X Window System 或 Wayland 提供。

## Linux 使用

---

所有发行版的使用基本上是相似的，主要包括安装、软件管理、系统配置、服务管理、网络配置等。

### 安装

下载目标发行版的 ISO 镜像文件并刻录到 USB 驱动器或 DVD，从该安装介质启动。大多数发行版在 Live CD 模式下提供图形化安装界面，也有些发行版提供命令行安装界面或无图形界面（通过 `chroot` 方式）。无论采用何种方式，安装流程本质相同。

**安装过程中的关键决策包括：**

* **语言和时区** - 影响系统语言和时间显示
* **键盘布局** - 决定键盘映射方式
* **分区方案** - 最关键的决策，影响多系统共存等
* **预装软件包** - 决定系统初始配置
* **引导程序** - 多系统环境下尤为重要

安装完成后系统会提示重启，进入新安装的 Linux 系统。

> * **与 Windows 相比较：** Windows 的安装全程自动化，强制用户登录或输入许可证密钥；Linux 则将许多决策权交给用户。
> * **引导程序的作用：** 引导程序是操作系统的启动门户。没有引导程序，系统无法启动。常见的 Linux 引导程序有 GRUB、LILO、Syslinux 等。现代 Windows 使用的是 Windows Boot Manager。GRUB 是目前最常用的 Linux 引导程序，支持多种文件系统和多操作系统启动。

在电脑上同时安装 Linux 和 Windows 时，会遇到几个常见的技术问题，需要特别注意：

#### 问题1：Linux 的 GRUB 引导程序中缺少 Windows 启动项

**原因：** 安装程序未能自动检测 Windows Boot Manager。

**解决方案：**

* 在 Linux 中使用 `os-prober` 工具自动检测 Windows 并添加启动项
* 或手动编辑 GRUB 配置文件（通常位于 `/etc/grub.d/` 目录）

#### 问题2：切换系统后时间相差 8 小时

**原因：** Linux 和 Windows 使用不同的时间标准。Linux 使用 UTC 时间，Windows 使用本地时间。

**解决方案：**

* 在 Linux 中执行：`timedatectl set-local-rtc 1`（改为本地时间）
* 或在 Windows 中执行：`reg add "HKEY_LOCAL_MACHINE\SYSTEM\CurrentControlSet\Control\TimeZoneInformation" /v RealTimeIsUniversal /t REG_DWORD /d 1 /f`（改为 UTC）

#### 问题3：Windows 更新后 UEFI 启动菜单中缺少 GRUB

**原因：** Microsoft 反感开源软件。Windows 更新会自动删除 EFI 分区中的 GRUB 程序，并调整 UEFI 启动顺序，导致无法进入 Linux。

**解决方案：**

* 将 Windows 安装在 USB 移动硬盘上（需要时连接，不用时拔掉）
* 或手动恢复 GRUB（参考 Arch Wiki 相关文档）

> 作者经验：由于 Linux 能满足 99% 的日常需求，将 Windows 放在 USB 硬盘上是最实用的方案。

> * [Arch Wiki 引导加载程序](https://wiki.archlinuxcn.org/wiki/Arch_%E7%9A%84%E5%90%AF%E5%8A%A8%E6%B5%81%E7%A8%8B#%E5%BC%95%E5%AF%BC%E5%8A%A0%E8%BD%BD%E7%A8%8B%E5%BA%8F/)
> * [Arch Wiki 双系统](https://wiki.archlinuxcn.org/wiki/Arch_%2B_Windows_%E5%8F%8C%E7%B3%BB%E7%BB%9F/)

### 桌面环境的选择

Linux Kernel 仅提供字符界面，图形界面需要单独安装。**桌面环境（Desktop Environment，简称 DE）** 是一组软件集合，提供图形用户界面和应用程序，让用户能够便捷地与操作系统交互。

```asciidoc
+----------------------------------------------------------+
|                    用户应用程序                          |
|  +----------+  +----------+  +----------+  +----------+ |
|  | Firefox  |  |  VS Code  |  | Terminal |  |  Files   | |
|  +----------+  +----------+  +----------+  +----------+ |
+----------------------------------------------------------+
|                    桌面环境（DE）                        |
|                                                          |
|  +-------------+  +-------------+  +----------------+  |
|  | Window      |  | Desktop     |  | File Manager   |  |
|  | Manager     |  | Shell       |  |                |  |
|  +-------------+  +-------------+  +----------------+  |
|                                                          |
|  +-------------+  +-------------+  +----------------+  |
|  | Panel /     |  | Settings    |  | Notification   |  |
|  | Dock        |  |             |  | System         |  |
|  +-------------+  +-------------+  +----------------+  |
+----------------------------------------------------------+
|                 图形显示系统                            |
|                                                          |
|       Wayland / X11      ←→      Compositor             |
|                                                          |
+----------------------------------------------------------+
|                    Linux User Space                      |
|                                                          |
|  Shell | systemd | DBus | PipeWire | NetworkManager ... |
+----------------------------------------------------------+
|                    Linux Kernel                           |
|                                                          |
|  Process | Memory | Filesystem | Network | Drivers      |
+----------------------------------------------------------+
|                      Hardware                            |
|                                                          |
|       CPU | GPU | RAM | Disk | Keyboard | Mouse         |
+----------------------------------------------------------+
```

**常见的桌面环境包括：**

* **GNOME** - 现代、简洁、注重用户体验
* **KDE Plasma** - 功能丰富、高度可定制
* **XFCE** - 轻量级、适合老旧硬件
* **LXDE** - 极轻量级
* **MATE** - GNOME 2 的延续版本

**窗口管理器类型对比：**

| 特性 | 平铺式（Tiling） | 堆叠式（Stacking） | 混合式（Hybrid） |
| ------ | ------------------ | ------------------- | ----------------- |
| 资源占用 | 极低 | 较高 | 中等 |
| 易用性 | 需要学习曲线 | 开箱即用 | 适中 |
| 可定制性 | 极高 | 中等 | 中等 |
| 学习成本 | 高（需要快捷键） | 低（鼠标优先） | 低-中 |
| 常见代表 | i3、dwm、hyprland | GNOME、KDE | cosmic |

选择时通常需要在 **生产力** 和 **易用性** 之间权衡。开发者常选择平铺式以提高效率，普通用户倾向于堆叠式的友好界面。

### 与 Linux 交互

#### 什么是 Shell?

**Shell**（壳层）在计算机科学中是指"为用户提供用户界面"的软件。通常指命令行界面的解析器，是与 Kernel 相对的概念。

> * Windows 中的 **命令提示符（Command Prompt）** 和 **PowerShell** 也是 Shell 的一种，但它们与 Linux Shell 的设计理念和功能差异很大。Windows Shell 更注重图形界面和用户体验，Linux Shell 则更注重灵活性和可编程性。
>
> * 维基百科条目 [外壳](https://zh.wikipedia.org/wiki/%E6%AE%BC%E5%B1%A4/)

#### Terminal、Shell、Console 有什么区别？

虽然我们使用 Shell 时通常需要打开一个叫**终端**（Terminal 或 Console）的软件，但严格来说，Terminal、Shell、Console 是三个不同的概念，不应混淆。

```asciidoc
+---------------------------+
|      Terminal Emulator    |
|                           |
|  GNOME Terminal / Konsole |
|  Kitty / Alacritty / ...  |
+-------------+-------------+
              |
              | 输入/输出
              v
+---------------------------+
|            PTY            |
|    Pseudo Terminal        |
+-------------+-------------+
              |
              v
+---------------------------+
|           Shell           |
|      bash / zsh / fish    |
+-------------+-------------+
              |
              | 系统调用
              v
+---------------------------+
|       Linux Kernel        |
+---------------------------+
```

* **Terminal Emulator** - 负责提供终端窗口和模拟终端行为（如 GNOME Terminal、Konsole、Kitty）
* **Shell** - 负责解析并执行用户输入的命令（如 Bash、Zsh、Fish）
* **TTY** - Linux 中终端设备的抽象
* **PTY** - 伪终端，用于让终端模拟器和 SSH 等程序连接到 Shell
* **Console** - 系统级的控制台，概念比 Terminal 更宽泛

> 真正的"终端"现在已经淘汰，许多人不了解其历史含义。早期计算机的"终端"指代的是物理设备（类似 CRT 显示器），用于输入和输出数据。这种设备起源于电传打字机（TeleTypewriter，简称 TTY）。随着计算机发展，物理终端被软件模拟器（Terminal Emulator）所取代。

#### 怎么灵活地使用 Shell？

Shell 不仅仅是"黑框框"，它本身是一个功能强大的编程语言，支持变量、条件语句、循环、函数等编程结构。通过 Shell 脚本，我们可以：

* 自动化执行一系列命令
* 处理文件和数据
* 构建复杂的应用程序

常见的 `.sh` 文件就是 Shell 脚本，通常使用 Bash 或 Zsh 解释执行。

**Shell 功能扩展工具：**

* **openssh** - 远程连接到 Shell，执行命令和管理远程系统
* **tmux** - 在一个终端中创建多个会话，支持分屏和会话管理
* **screen** - 类似于 tmux 的经典终端复用工具

**常用命令技巧：**

| 符号 | 功能 | 示例 |
| ------ | ------ | ------ |
| `\|` | 管道：前一命令的输出作为下一命令的输入 | `ls \| grep ".txt"` |
| `>` | 输出重定向到文件 | `echo "hello" > file.txt` |
| `>>` | 追加到文件末尾 | `echo "world" >> file.txt` |
| `&` | 后台执行 | `sleep 100 &` |
| `Ctrl+C` | 终止当前命令 | - |
| `Ctrl+Z` | 暂停命令，放入后台 | - |
| `jobs` | 查看后台任务 | - |
| `fg` | 将后台任务切换到前台 | `fg %1` |

**实用例子：**

```bash
# 查找所有 .txt 文件并保存结果
ls -l | grep ".txt" > txt_files.txt

# 后台搜索错误日志
dmesg | grep "error" &

# 使用管道链接多个命令
cat huge_file.log | grep "ERROR" | wc -l
```

#### 怎么正确使用桌面环境？

桌面环境提供类似 Windows 的图形界面，用户可以通过鼠标和键盘与系统交互。它通常包括窗口管理器、文件管理器、应用程序启动器、系统设置工具等，让用户轻松打开应用、管理文件和调整系统设置。

**但是 Linux 桌面与 Windows 差异很大：**

Linux 桌面遵循 **Freedesktop.org 规范**，提供统一的接口和协议，使不同桌面环境能互相兼容和协作。例如：

* GNOME 和 KDE Plasma 都支持 **XDG 标准**，可共享应用菜单、文件类型关联、通知系统等
* 主目录有了标准的"下载""文档"等目录
* 网页中可使用深链接打开本地文件
* 应用程序可在不同桌面间共享配置和数据

**重要协议和技术：** D-Bus、X11、Wayland 等都是 Freedesktop.org 规范的一部分，旨在提升互操作性。

**桌面条目（Desktop Entry）：**

类似于 Windows 的快捷方式，Linux 桌面环境中也有"桌面条目"的概念——这是一个文本文件（`.desktop` 扩展名），包含应用程序的名称、图标、执行命令等信息。

**位置：** `/usr/share/applications/` 或 `~/.local/share/applications/`

**用途：**

* 在应用程序菜单中快速启动应用
* 拖动到桌面或任务栏创建快捷方式
* 配置应用程序的默认打开方式

> **重要：** 需要区分桌面条目、软链接、硬链接这三个概念。

> * 维基百科条目 [Freedesktop.org](https://zh.wikipedia.org/wiki/Freedesktop.org/)

### 怎么配置和维护 Linux 系统？

> 大部分发行版可以参考 [Arch Wiki 建议阅读](https://wiki.archlinuxcn.org/wiki/%E5%BB%BA%E8%AE%AE%E9%98%85%E8%AF%BB/)

大部分在 Linux 下的维护工具都可以在 Windows 中找到对应的类似工具，接下来可以对比 Windows 和 Linux 的维护工具，帮助读者快速上手 Linux 系统的配置和维护。

> 与 Windows 相比， Linux 系统在各个方面都要更加“干净”和可控。

#### 软件安装

**软件安装方式的对比：**

不同发行版使用不同的软件包格式和包管理器：

| 发行版系列 | 包管理器 | 包格式 | 常见命令 |
| ----------- | -------- | ------ | --------- |
| Debian系（Ubuntu、Mint） | APT | DEB | `apt install package_name` |
| Red Hat系（Fedora、CentOS） | DNF/YUM | RPM | `dnf install package_name` |
| Arch系 | Pacman | TAR.XZ | `pacman -S package_name` |
| OpenSUSE | Zypper | RPM | `zypper install package_name` |

通过 `man` 命令查看包管理器的详细用法：`man apt` 或 `man pacman`

**容器化应用格式：**

为避免"依赖地狱"，现代 Linux 提供容器化应用格式，将应用与其依赖打包在一起：

* **Flatpak** - 跨发行版，权限隔离良好
* **Snap** - Ubuntu 优先支持，功能完整
* **AppImage** - 单一可执行文件，无需安装

这些格式允许应用在任何 Linux 发行版上运行，无需担心依赖冲突。

> **中国大陆用户注意：** 使用大多数发行版官方仓库时会遇到连接不稳定的问题。需要换成国内镜像源（如清华、阿里、网易等）。参考 [Arch Wiki 中国用户推荐方案](https://wiki.archlinuxcn.org/wiki/%E5%BB%BA%E8%AE%AE%E9%98%85%E8%AF%BB/%E4%B8%AD%E5%9B%BD%E7%94%A8%E6%88%B7%E7%9A%84%E6%8E%A8%E8%8D%90%E8%A7%A3%E5%86%B3%E6%96%B9%E6%A1%88/)

**Windows 软件安装对比：**

Windows 通常依赖安装程序（Installer）。用户需要：

1. 手动下载安装程序或使用 Windows Store
2. 运行 `.exe` 安装程序（会解压文件、修改注册表）
3. 或使用 winget、Chocolatey、Scoop 等第三方包管理器

缺点：软件位置分散、依赖管理混乱、卸载不彻底。

#### 软件配置

**Linux 配置文件的组织：**

| 类型 | 位置 | 特点 | 示例 |
| ------ | ------ | ------ | ------ |
| 系统级配置 | `/etc/` | 所有用户共享 | `/etc/ssh/sshd_config` |
| 用户级配置 | `~/.config/` | 特定用户专属 | `~/.config/code/settings.json` |
| 隐藏配置 | `~/.*` | 以 `.` 开头（隐藏） | `~/.bashrc`、`~/.vimrc` |

**优势：** 配置文件是**纯文本**，可以：

* 用 Git 进行版本管理
* 在不同系统间同步
* 轻松编辑和审计

**查看隐藏文件：** `ls -a`

#### 驱动安装

**Linux 驱动特点：**

大部分硬件驱动已集成在 Linux 内核中，系统会自动加载。常见设备无需手动安装：

* 网络适配器
* 显卡（通用驱动；专有驱动可选）
* 声卡
* USB 设备

**需要手动安装的情况：**

* 通过包管理器安装额外驱动
* 从硬件厂商源代码编译安装
* Nvidia 专有驱动（性能更优但稳定性一般）

**Windows 驱动对比：**

Windows 需要用户手动管理所有驱动：

* 通过设备管理器自动检测（准确度一般）
* 下载厂商驱动程序并手动安装
* 缺少驱动时影响硬件正常工作

#### 服务管理

**systemd 服务管理命令：**

现代 Linux 发行版使用 `systemd` 作为初始化系统。常用的 `systemctl` 命令：

| 命令 | 功能 | 示例 |
| ------ | ------ | ------ |
| `start` | 启动服务 | `systemctl start nginx` |
| `stop` | 停止服务 | `systemctl stop nginx` |
| `restart` | 重启服务 | `systemctl restart nginx` |
| `enable` | 设置开机自启 | `systemctl enable nginx` |
| `disable` | 取消开机自启 | `systemctl disable nginx` |
| `status` | 查看服务状态 | `systemctl status nginx` |
| `list-units` | 列出所有服务 | `systemctl list-units --type=service` |

需要 root 权限时使用 `sudo`。

### 系统软件

**什么是守护进程？**

守护进程（daemon）是在后台执行、不与用户直接交互的程序。大多数系统服务通过初始化系统启动守护进程提供。例如：

* 网络服务（如 nginx、apache）
* 打印服务
* 日志服务（syslog）
* SSH 远程连接服务

守护进程通常在系统启动时自动启动，并在后台持续运行，等待处理请求。

**查看和管理守护进程：**

```bash
# 查看进程树（包含守护进程）
pstree

# 查看和管理 systemd 守护进程
systemctl list-units --type=service      # 列出所有服务
systemctl status service_name             # 查看特定服务状态
journalctl -u service_name                # 查看服务日志
```

```bash
[nix-shell:~]$ pstree
-+= 00001 root /run/current-system/systemd/lib/systemd/systemd --switched-root --system --deserialize=47 
 |--= 14319 root /nix/store/zyjsymnng13wb1wzf0r8xb73whwh13g7-fwupd-2.1.6/libexec/fwupd/fwupd 
 |--= 03040 root /nix/store/y3rhxwgzhya1wijhbixjwbbfv2dp48pr-power-profiles-daemon-0.30/libexec/power-profiles-daemon 
 |--= 02711 root /nix/store/2rypfklqw1s7y1ym2z20wjqzahjrg8lg-udisks-2.11.2/libexec/udisks2/udisksd 
 |--- 02678 gujial /nix/store/7nihgclyrxsf1yc9bkqzd38k0kcqvn35-kwallet-6.29.0/bin/ksecretd --pam-login 13 14 
 |-+= 02646 gujial /run/current-system/systemd/lib/systemd/systemd --user --deserialize=37 
 | |-+= 16750 gujial /nix/store/61wpi9gi1snkq40hkc7rknjl3r3pnsvz-electron-unwrapped-43.4.1/libexec/electron/electron /nix/store/ks156j3zn1zgix6x09
 | | |--- 16811 gujial /nix/store/61wpi9gi1snkq40hkc7rknjl3r3pnsvz-electron-unwrapped-43.4.1/libexec/electron/electron --type=renderer --enable-cr
 | | |--- 16797 gujial /nix/store/61wpi9gi1snkq40hkc7rknjl3r3pnsvz-electron-unwrapped-43.4.1/libexec/electron/electron --type=utility --utility-su
 | | |-+- 16756 gujial /nix/store/61wpi9gi1snkq40hkc7rknjl3r3pnsvz-electron-unwrapped-43.4.1/libexec/electron/electron --type=zygote 
 | | | \--- 16758 gujial /nix/store/61wpi9gi1snkq40hkc7rknjl3r3pnsvz-electron-unwrapped-43.4.1/libexec/electron/electron --type=zygote 
 | | \-+- 16755 gujial /nix/store/61wpi9gi1snkq40hkc7rknjl3r3pnsvz-electron-unwrapped-43.4.1/libexec/electron/electron --type=zygote --no-zygote-s
 | |   \--- 16791 gujial /nix/store/61wpi9gi1snkq40hkc7rknjl3r3pnsvz-electron-unwrapped-43.4.1/libexec/electron/electron --type=gpu-process --ozon
 | |--= 08818 gujial /nix/store/fnihrng9j3v6p2rxavcw88g9cxrccy7h-gamemode-1.8.2/bin/gamemoded 
 | |--= 03348 gujial /nix/store/7nihgclyrxsf1yc9bkqzd38k0kcqvn35-kwallet-6.29.0/bin/kwalletd6 
 | |-+= 03221 gujial /nix/store/8wrz8srp846q7lmignl71jq1c9prracx-akonadi-26.08.0/bin/akonadi_control 
 | | |--- 03303 gujial /run/current-system/sw/bin/akonadi_unifiedmailbox_agent --identifier akonadi_unifiedmailbox_agent 
 | | |--- 03302 gujial /run/current-system/sw/bin/akonadi_sendlater_agent --identifier akonadi_sendlater_agent 
 | | |--- 03301 gujial /run/current-system/sw/bin/akonadi_newmailnotifier_agent --identifier akonadi_newmailnotifier_agent 
 | | |--- 03300 gujial /run/current-system/sw/bin/akonadi_migration_agent --identifier akonadi_migration_agent 
 | | |--- 03299 gujial /run/current-system/sw/bin/akonadi_mailmerge_agent --identifier akonadi_mailmerge_agent 
 | | |--- 03298 gujial /run/current-system/sw/bin/akonadi_mailfilter_agent --identifier akonadi_mailfilter_agent 
 | | |--- 03297 gujial /run/current-system/sw/bin/akonadi_maildispatcher_agent --identifier akonadi_maildispatcher_agent 
 | | |--- 03296 gujial /run/current-system/sw/bin/akonadi_maildir_resource --identifier akonadi_maildir_resource_0 
 | | |--- 03295 gujial /run/current-system/sw/bin/akonadi_indexing_agent --identifier akonadi_indexing_agent 
 | | |--- 03294 gujial /run/current-system/sw/bin/akonadi_imap_resource --identifier akonadi_imap_resource_4
# 以下省略
```

> 维基百科条目 [守护进程](https://zh.wikipedia.org/wiki/%E5%AE%88%E6%8A%A4%E8%BF%9B%E7%A8%8B/)

### 用户软件

> 大部分日用软件的解决方案可参考 [Arch Wiki 中国用户推荐](https://wiki.archlinuxcn.org/wiki/%E5%BB%BA%E8%AE%AE%E9%98%85%E8%AF%BB/%E4%B8%AD%E5%9B%BD%E7%94%A8%E6%88%B7%E7%9A%84%E6%8E%A8%E8%8D%90%E8%A7%A3%E5%86%B3%E6%96%B9%E6%A1%88/)

**不同发行版的预装软件差异：**

易用性强的发行版（如 Ubuntu）通常预装：

* LibreOffice（办公套件）
* 桌面环境专用工具（Gnome 自带游戏、KDE 应用套件等）
* 多媒体播放器和编辑器

**自定义程度高的发行版** 需要用户手动配置：

* 输入法框架（Fcitx5 > iBus）
* 中文输入法（通过 addon 方式安装）
* 主要应用软件

**软件安装原则：**

1. **优先使用包管理器** - 便于依赖管理和卸载
2. **查找第三方仓库** - 如 AUR（Arch User Repository）
3. **自己打包冷门软件** - 而不是直接 `make install`
4. **避免 `make install`** - 易导致依赖冲突，包管理器无法追踪

> 若非必要，不要使用 `make install`。除非你有足够的精力手工管理软件包的功能。

**Windows 与 Linux 软件管理的根本差异：**

在 Windows 中：

* 每个软件可自选安装位置（无强制要求）
* 动态链接库（.dll）位置无标准规范
* 软件倾向自带运行库，避免依赖冲突
* 优先加载工作目录下的 .dll（导致混乱）
* 软件卸载依赖自身实现，往往不彻底
* 有的软件通过卸载程序增加流氓行为
* 有的软件通过"P2P下载器"静默安装捆绑程序

这导致 Windows 软件生态混乱，系统臃肿。

在 Linux 中：

* **FHS 标准**规定文件位置
* 包管理器集中管理所有依赖
* 卸载彻底，无残留
* 系统保持整洁

**Linux 命令行工具的优势：**

Linux 拥有大量实用的命令行工具，通常比图形界面版本更强大，如 [yt-dlp](https://github.com/yt-dlp/yt-dlp/)（视频下载）。

特点：

* 虽然部分工具提供 Windows 版本，但命令行交互在 Windows 上**水土不服**
* 这类小工具在 Windows 上无安装程序，需手工配置 PATH
* 在 Linux 上通过包管理器安装，开箱即用

**实用建议：** 有 Web 应用就不装客户端（减少系统负担）。

**国内软件适配现状：**

由于国情政策（信创需求），国内软件近年开始适配 Linux，但进展缓慢：

| 厂家 | 态度 | 现状 |
| ------ | ------ | ------ |
| 腾讯 | 被迫适配 | 适配效果差，功能残缺 |
| 华为 | 直接拒绝 | 不提供任何支持 |
| 钉钉 | 勉强适配 | 连基本使用都无法保证 |
| 开源社区 | 主动支持 | Web/跨平台应用普遍 |

**建议：** 日常使用 Linux 需要强大的系统维护能力和替代软件检索能力。在 AI 时代，使用门槛已大幅降低。

**问题诊断最佳实践：**

软件出现问题时必须查看日志：

| 工具 | 用途 | 示例 |
| ------ | ------ | ------ |
| `dmesg` | 查看内核日志 | `dmesg \| tail -20` |
| `journalctl` | 查看服务日志 | `journalctl -u nginx -n 50` |
| `>` 重定向 | 保存软件输出到文件 | `./app > app.log 2>&1` |

> **重要：** 没有日志，再聪明的 AI 也只能瞎编。提问时参考 [提问的智慧](https://github.com/ryanhanwu/How-To-Ask-Questions-The-Smart-Way/blob/main/README-zh_CN.md)。

**为什么 Linux 下不使用 Word？**

Office 文档（`.docx`）本质上是压缩包（`.zip`），包含二进制数据，存在以下问题：

1. **版本管理困难** - 二进制文件无法被 Git 正常跟踪
2. **渲染不一致** - 非微软官方软件难以完美渲染（商业策略）
3. **工作流打断** - 强制切换到图形界面，中断命令行工作
4. **格式封闭** - 仅微软软件支持完全兼容

正如 [《提问的智慧》](https://github.com/ryanhanwu/How-To-Ask-Questions-The-Smart-Way/blob/main/README-zh_CN.md) 所言：
> "Don't ever expect hackers to read closed proprietary formats like Microsoft Word. Most hackers would react to you as if you had dumped a pile of steaming pig manure on their doorstep."

**建议：** 使用 Markdown、纯文本等开放格式。

**FHS 标准的重要性：**

Linux 遵循 **Filesystem Hierarchy Standard（FHS）** 标准，规定了所有文件的位置。这与 Windows 的任意安装位置形成对比。

**结果：**

* 不能像 Windows 那样下载 `.exe` 直接运行
* 即使是 AppImage，也需要在 FHS 规定的位置寻找依赖库
* 冷门软件需要用户自己打包或编写 Nix 环境

**建议：** 掌握你使用的发行版软件包的打包方法，便于安装非主流软件。

> * 维基百科条目[文件系统层次结构标准](https://zh.wikipedia.org/wiki/%E6%96%87%E4%BB%B6%E7%B3%BB%E7%BB%9F%E5%B1%82%E6%AC%A1%E7%BB%93%E6%9E%84%E6%A0%87%E5%87%86/)

## 为什么选择 Linux 进行开发？

---

**性能和原生支持：**

* Docker 容器在 Linux 上原生运行，无需 WSL，**性能损失极小**
* 命令行优先的设计，`conda`、`uv` 等工具更易使用
* 环境变量配置远比 Windows 简单
* 除华为和苹果外，几乎所有开发工具都可直接使用

**多平台测试：**

* 通过容器和兼容层技术，无需虚拟机即可测试 Android、Windows 应用
* 开发环境与云服务、远程服务器集成更便捷
* 分布式开发和部署更容易

**开源工具生态：**

* 几十年积累的开源软件和工具库
* 熟练后有极高的效率和灵活性
* 高度可定制，许多工具在 Windows 上无对应版本
* Linux 庞大的开源社区提供丰富的库和工具，**节省开发时间和成本**

**AI 时代：**

* Linux 是大语言模型运行和训练的**首选平台**
* CUDA 等工具在 Linux 上才能发挥全部实力

> 注：虽然 CUDA 优先支持 Linux，但英伟达开源驱动在 Linux 上稳定性不如 Windows，偶尔会出现睡眠唤醒问题（Arch Wiki 有解决方案）。

## Linux 上的游戏体验

---

**游戏兼容性现状：**

长期以来，游戏是 Linux 用户面临的主要痛点。但近年情况已大幅改善：

**原生 Linux 游戏：**

* 许多独立游戏原生支持 Linux
* 现代引擎（如 Godot、Unreal Engine）对 Linux 支持良好
* Steam 平台上 Linux 原生游戏数量持续增长

**兼容层方案：**

| 方案 | 原理 | 适用范围 | 性能 |
| ------ | ------ | -------- | ------ |
| **Proton** | DirectX → Vulkan 翻译 | Windows 游戏（Steam） | 80-95% |
| **Wine** | API 兼容层 | Windows 应用和游戏 | 变化较大 |
| **DXVK** | DirectX 11/12 → Vulkan | 高端游戏 | 优秀 |
| **VKD3D** | Direct3D 12 → Vulkan | 新型游戏 | 优秀 |

**Steam 与 Proton：**

* Valve 官方开发的 Proton，基于 Wine 优化
* **Proton 实验版** 对最新游戏支持最好（但可能不稳定）
* **Proton Stable** 稳定版适合已验证的游戏
* ProtonDB 社区提供游戏兼容性评级（金/银/铜/不可玩）

**实用建议：**

```bash
# 在 Steam 中启用 Proton
# Settings → Compatibility → Enable Proton for Titles...

# 使用 ProtonDB 查询游戏兼容性
# https://protondb.com/

# 通过 Lutris 管理 Windows 游戏和模拟器
# 支持 GOG、Battle.net、Epic Games 等
```

**硬件考虑：**

* **AMD 显卡** - 开源驱动支持优秀，性能稳定
* **Nvidia 显卡** - 专有驱动性能更优，但驱动质量一般
* **Intel 集成显卡** - 支持完善，轻型游戏最佳

**游戏文件系统：**

尽量不使用 NTFS 分区存放游戏，可能导致文件权限问题。使用 ext4 或 btrfs。挂载 NTFS 分区时，需确保 `uid` 和 `gid` 设置正确，避免权限问题。

**性能优化工具：**

```bash
# GameMode - 游戏运行时性能优化
gamemoded -r application_name

# MangoHUD - 游戏内 FPS、GPU、CPU 监控
mangohud application_name

# FSR（FidelityFX Super Resolution）- AMD 超分辨率技术
# 类似 DLSS，性能损失小，画质提升
```

> **现实：** Linux 游戏支持虽然改善了很多，但仍不如 Windows。反竞争行为（如某些游戏使用 anti-cheat 禁止 Linux）仍然存在。用 Linux 全职玩游戏不现实，但兼职游戏完全可行。

## Linux 系统的未来展望

---

**新范式的出现：**

随着存储设备进步，函数式编程范式重新流行，**无状态、声明式**的思想也被应用到 Linux 系统配置中。

**传统命令式配置的问题：**

* 软件部署的可复现性差
* 日常使用中软件包越来越多，却记不清安装了什么
* 系统状态随意变化，难以维护

**现代解决方案：**

容器化技术大量应用于服务部署，但对于系统部署过于臃肿。因此，**不可变文件系统、无状态、声明式配置**的新型发行版近年大量出现，如 **NixOS** 和 **Guix** 等。

### NixOS：声明式系统配置

Nix 源自 [纯函数式软件部署模型](https://jonathanlorimer.dev/posts/nix-thesis.html)。Nix 语言将函数式编程的**不可变性和无副作用**应用到软件部署，号称达到 **99% 的可复现性**。

**NixOS 的优势：**

* 纯函数式软件部署模型在系统部署上的完整应用
* **声明式配置大量减少系统维护时间**
* 简化日常维护，避免重新安装系统
* 利用 Nix Flake，在不同机器间灵活复用配置
* **整个系统配置可以上传到 Git（脱敏后），实现完整备份**

**NixOS 的挑战：**

该新范式刚刚起步，存在明显瓶颈：

* 社区规模较小，文档不够全面
* AI 难以完成全部系统维护工作
* 实际维护往往需要用户**阅读 Nix 源代码**
* 系统不遵循 FHS 标准（通过链接构造基本 FHS 环境）
* 用户需要既熟悉**函数式编程语言**，又了解 **Linux 程序运行过程**
* 非主流软件需要手工打包或编写 Nix 环境

**现状：**

* 主流软件（如 Steam）社区已有 Nix 环境，利用其高复现性可方便使用
* 非主流软件对用户能力要求很高

### 使用 Nix Flake 进行软件开发与打包

**什么是 Nix Flake？**

Nix Flake（Flake 是 Flexible Locking）是 Nix 生态中最重要的创新，解决了传统 Nix 的可复现性问题：

* **确定性依赖版本** - `flake.lock` 文件锁定所有依赖的确切版本
* **跨平台一致性** - 同一个 `flake.nix` 在不同机器上产生完全相同的环境
* **模块化设计** - 支持输入/输出，便于代码复用
* **统一接口** - 标准化的包定义格式

**Flake 的基本结构：**

```nix
{
  description = "My project development environment";

  inputs = {
    nixpkgs.url = "github:NixOS/nixpkgs/nixos-unstable";
    flake-utils.url = "github:numtide/flake-utils";
  };

  outputs = { self, nixpkgs, flake-utils }:
    flake-utils.lib.eachDefaultSystem (system:
      let
        pkgs = nixpkgs.legacyPackages.${system};
      in
      {
        devShells.default = pkgs.mkShell {
          buildInputs = with pkgs; [
            python311
            nodejs
            rustc
            cargo
          ];
        };

        packages.default = pkgs.stdenv.mkDerivation {
          name = "my-app";
          version = "0.1.0";
          src = ./.;
          # 构建步骤...
        };
      }
    );
}
```

**使用 Flake 开发的优势：**

| 特性 | 好处 |
| ------ | ------ |
| **完全隔离** | 开发环境与系统环境完全隔离，不污染系统 |
| **快速切换** | `nix flake update` 更新依赖，`nix flake revert` 回滚 |
| **团队协作** | 提交 `flake.lock`，所有团队成员环境完全相同 |
| **CI/CD 友好** | GitHub Actions 等 CI 使用同一个 flake.nix |
| **可复现构建** | 三个月前的 commit，构建结果完全相同 |

**开发环境使用流程：**

```bash
# 进入项目目录
cd my-project

# 初始化 flake（选择模板）
nix flake init -t github:numtide/flake-templates#python

# 进入开发环境（自动加载 devShell）
nix develop
# 或配合 direnv 自动加载
direnv allow

# 查看可用的 flake 输出
nix flake show

# 构建包
nix build

# 运行包
nix run .# my-package

# 更新所有依赖锁定
nix flake update

# 回滚到之前的版本
nix flake update --revert
```

**打包软件的核心概念：**

Nix 打包基于 **derivation** 概念，即明确定义软件的输入、构建过程和输出。

**最小化 Nix 包示例：**

```nix
{ stdenv, fetchurl }:

stdenv.mkDerivation {
  pname = "hello";
  version = "2.12.1";
  
  src = fetchurl {
    url = "https://ftpmirror.gnu.org/hello/hello-${version}.tar.gz";
    sha256 = "sha256-XXX...";
  };
  
  # stdenv 提供默认的 configure、make、make install
}
```

**常见依赖类型：**

```nix
{
  buildInputs = with pkgs; [
    # 构建时依赖（不会被传递给依赖方）
    gcc
    cmake
  ];

  propagatedBuildInputs = with pkgs; [
    # 运行时依赖（会被依赖此包的其他包继承）
    openssl
  ];

  nativeBuildInputs = with pkgs; [
    # 特定于平台的构建工具（交叉编译时在构建机上运行）
    pkg-config
  ];
}
```

**常见打包场景对比：**

| 语言/框架 | 方案 | 复杂度 | 典型依赖处理 |
| ---------- | ------ | ------ | ----------- |
| Python | `python3Packages.buildPythonApplication` | 低 | 自动处理 Python 依赖 |
| Node.js | `nodejs` + `mkYarnPackage` | 中 | 处理 node_modules 锁定 |
| Rust | `rustPlatform.buildRustPackage` | 低-中 | Cargo.lock 确保可复现性 |
| Go | `buildGoModule` | 低 | go.mod/go.sum 管理 |
| C/C++ | `stdenv.mkDerivation` | 中-高 | 手工指定所有依赖 |

**实战案例：Python CLI 工具打包**

```nix
# flake.nix
{
  inputs = {
    nixpkgs.url = "github:NixOS/nixpkgs/nixos-unstable";
    flake-utils.url = "github:numtide/flake-utils";
  };
  
  outputs = { self, nixpkgs, flake-utils }:
    flake-utils.lib.eachDefaultSystem (system:
      let
        pkgs = nixpkgs.legacyPackages.${system};
      in
      {
        packages.default = pkgs.python3Packages.buildPythonApplication {
          pname = "my-cli-tool";
          version = "0.1.0";
          src = ./.;
          
          # Python 运行时依赖
          propagatedBuildInputs = with pkgs.python3Packages; [
            click
            requests
          ];
        };
        
        # 开发环境
        devShells.default = pkgs.mkShell {
          buildInputs = with pkgs; [
            python3
            python3Packages.pip
            python3Packages.black
            python3Packages.pytest
            ruff  # 代码检查工具
          ];
        };
      }
    );
}
```

**Nix 打包的黄金法则：**

1. **不要依赖系统文件** - 所有依赖必须显式在 `buildInputs` 中声明
2. **使用 patchelf 调整 rpath** - 确保二进制程序运行时找到依赖
3. **处理 FHS 不兼容** - 某些软件假设 FHS 标准路径，需要 `patchShebangs` 或 `wrapProgram`
4. **测试多个平台** - Linux x86_64、ARM、macOS 等
5. **充分利用 flake.lock** - Git 提交 `flake.lock`，确保可复现性
6. **学会调试** - 使用 `nix shell` 进入构建环境，`nix flake show` 查看输出

**处理复杂情况：**

```bash
# 进入 Nix shell 调试
nix develop

# 查看构建步骤（以 hello 包为例）
nix build nixpkgs#hello -L  # -L 显示日志

# 查看包的依赖树
nix why-depends ./result nixpkgs#openssl

# 进入特定包的构建环境
nix develop nixpkgs#firefox
```

**与传统包管理的对比：**

| 特性 | Nix Flake | pip/npm/Cargo | 系统包管理 |
| ------ | ---------- | --------------- | ---------- |
| 版本隔离 | ✅ 完美 | ⚠️ 虚拟环境 | ❌ 全局冲突 |
| 可复现性 | ✅ 99%+ | ⚠️ 仅限单语言 | ⚠️ 依赖复杂 |
| 依赖管理 | ✅ 完全控制 | ⚠️ 语言级别 | ⚠️ 系统级别 |
| 性能 | ⚠️ 构建可能慢 | ✅ 快 | ✅ 快 |
| 学习曲线 | ❌ 陡峭 | ✅ 平缓 | ✅ 平缓 |
| 跨语言项目 | ✅ 完美支持 | ❌ 困难 | ✅ 支持 |

> Nix Flake 也可以与现有的构建系统相结合，比如我的 [reVC-Improved](https://github.com/gujial/re3/)

**AI 与声明式系统的未来：**

通过配置文件全面控制系统部署和软件开发，使命令行优先的 Linux 能够更好地与大语言模型相结合。理想状态下，**AI 可直接代替用户完成系统维护和环境配置**。

但当前现实：

* 声明式 Linux 刚起步，文档和社区支持不足
* AI 需要学习 Nix 语言的细节
* AI 经常胡编乱造地修改配置文件（尤其是复杂的打包场景）

**应对方案：** 使用**版本控制工具轻松控制系统和项目版本**（这是声明式配置的核心优势）。Git 的存在使得任何 AI 生成的错误配置都可以轻松回滚。

## 总结

本文从 Linux 的基础概念出发，深入讲解了 Linux 发行版的组成、系统使用、软件管理，以及面向开发者和游戏玩家的实际应用场景。

**关键要点回顾：**

1. **理解 Linux 的本质** - Linux 仅是内核，与 GNU 工具结合形成完整系统
2. **发行版的多样性** - 不同发行版各有特色，但原理基本相通
3. **系统配置的标准化** - FHS 标准、systemd、包管理器等为 Linux 提供一致的体验
4. **软件管理的优势** - 相比 Windows 的混乱，Linux 的集中管理更清晰高效
5. **开发友好性** - Docker 原生支持、开源工具丰富、AI/ML 优先平台
6. **游戏兼容性改善** - Proton 等工具使 Linux 上玩游戏成为现实
7. **声明式配置的未来** - NixOS 和 Nix Flake 代表了下一代系统管理方式

**Linux 与 Windows 的核心差异：**

| 维度 | Linux | Windows |
|------|-------|---------|
| **开源性** | ✅ 完全开源 | ❌ 闭源专有 |
| **自由度** | ✅ 极高可定制 | ⚠️ 受限于系统设计 |
| **软件管理** | ✅ 集中标准化 | ⚠️ 分散混乱 |
| **开发友好** | ✅ 优秀 | ⚠️ 需要额外工具 |
| **游戏支持** | ⚠️ 在改善 | ✅ 优秀 |
| **企业支持** | ✅ 开源社区强大 | ✅ 商业支持完善 |
| **学习成本** | ⚠️ 需要时间 | ✅ 快速上手 |

**给初学者的建议：**

1. **选择易用性强的发行版**（Ubuntu、Fedora、Linux Mint）作为起点
2. **先从日常使用开始**，而不是急于深入系统细节
3. **充分利用开源社区**（Arch Wiki、Stack Overflow、GitHub Issues）
4. **不要过度复杂化**，大多数 Linux 任务并不需要深厚的技术知识
5. **逐步探索高级特性**（如容器、Nix、systemd 等）

**给开发者的建议：**

1. **学习 Nix Flake** - 投资回报率很高，但有学习曲线
2. **充分利用容器技术** - Docker/Podman 比 Windows 上的 WSL 更高效
3. **关注 AI/ML 工具链** - CUDA、PyTorch 等在 Linux 上性能最优
4. **参与开源项目** - 贡献代码或报告 Bug，回馈社区
5. **建立自己的 dotfiles** - 将配置上传到 GitHub，便于跨机器同步

**展望未来：**

Linux 正处于一个激动人心的时代：

- **硬件支持日趋完善** - 越来越多的厂商主动支持 Linux
- **游戏生态改善** - Proton 和原生支持使 Linux 游戏体验大幅提升
- **声明式配置革命** - NixOS 等新型发行版改变系统管理方式
- **AI 赋能系统** - 大语言模型结合 Linux 的可编程性，系统维护将被重塑
- **社区力量强大** - 数百万开发者、数千个开源项目推动生态繁荣

**最后的话：**

选择 Linux 不是放弃 Windows，而是获得额外的选择和自由。无论你是学生、开发者、还是普通用户，Linux 都能为你提供高效、透明、自由的计算环境。

从今天开始，在虚拟机中或旧电脑上尝试一个 Linux 发行版。或许下一个操作系统时代，就从你的探索开始。

**延伸阅读：**

- [Arch Linux Wiki](https://wiki.archlinux.org/) - 最全面的 Linux 文档
- [Linux From Scratch](https://www.linuxfromscratch.org/) - 深入理解 Linux
- [The Linux Documentation Project](https://tldp.org/) - 详尽的 Linux 教程
- [NixOS Manual](https://nixos.org/manual/nixos/stable/) - Nix 官方文档
- [Proton 兼容性数据库](https://protondb.com/) - 游戏兼容性查询
